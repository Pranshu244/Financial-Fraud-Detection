"""
The actual detection pipeline, as functions so FastAPI can run it live
in memory (on startup, and again on demand via /pipeline/run) instead
of reading a precomputed file.
"""
import pandas as pd
import numpy as np
import torch
import torch.nn.functional as F
from torch_geometric.nn import SAGEConv
from datetime import timedelta
from collections import defaultdict
from pathlib import Path
import bisect

LABEL_MAP = {"normal": 0, "mule": 1, "layering_node": 2, "structuring_source": 3}
INV_LABEL_MAP = {v: k for k, v in LABEL_MAP.items()}


class FraudGraphSAGE(torch.nn.Module):
    def __init__(self, in_dim, hid_dim, out_dim):
        super().__init__()
        self.conv1 = SAGEConv(in_dim, hid_dim)
        self.conv2 = SAGEConv(hid_dim, out_dim)

    def forward(self, x, edge_index):
        x = F.relu(self.conv1(x, edge_index))
        x = F.dropout(x, p=0.3, training=self.training)
        return self.conv2(x, edge_index)


def load_data(data_dir: str):
    df1 = pd.read_csv(f"{data_dir}/transactions.csv", parse_dates=["timestamp"])
    df2 = pd.read_csv(f"{data_dir}/accounts.csv")
    return df1, df2


# ---------------- Stage 1: temporal motif detection ----------------
def run_stage1(df1, df2):
    outgoing = df1[["timestamp", "source_account", "destination_account", "amount"]].sort_values("timestamp")
    WINDOW, MIN_DEST = timedelta(hours=24), 10
    fanout_flags = set()
    for account, group in outgoing.groupby("source_account"):
        group = group.sort_values("timestamp").reset_index(drop=True)
        left = 0
        for right in range(len(group)):
            while group.loc[right, "timestamp"] - group.loc[left, "timestamp"] > WINDOW:
                left += 1
            if group.iloc[left:right + 1]["destination_account"].nunique() >= MIN_DEST:
                fanout_flags.add(account)
                break

    MIN_HOP_AMOUNT, MIN_HOPS = 200000, 3
    MAX_GAP_HOURS, MAX_TOTAL_DURATION_HOURS, MAX_BRANCH = 100, 300, 5
    edges_f = df1[df1.amount >= MIN_HOP_AMOUNT][["timestamp", "source_account", "destination_account", "amount"]] \
        .sort_values("timestamp").reset_index(drop=True)
    outgoing_by_account = defaultdict(list)
    for _, row in edges_f.iterrows():
        outgoing_by_account[row.source_account].append((row.timestamp, row.destination_account, row.amount))
    for a in outgoing_by_account:
        outgoing_by_account[a].sort(key=lambda t: t[0])

    def next_hops(account, current_time):
        cands = outgoing_by_account.get(account, [])
        times = [c[0] for c in cands]
        idx = bisect.bisect_right(times, current_time)
        out = []
        for ts, dst, amt in cands[idx:]:
            if (ts - current_time).total_seconds() / 3600 > MAX_GAP_HOURS:
                break
            out.append((ts, dst, amt))
            if len(out) >= MAX_BRANCH:
                break
        return out

    layer_flags = set()

    def dfs(path, visited, start_time):
        last_ts, _, last_dst, _ = path[-1]
        if len(path) >= MIN_HOPS:
            layer_flags.add(path[0][1])
            for e in path:
                layer_flags.add(e[2])
        if (last_ts - start_time).total_seconds() / 3600 >= MAX_TOTAL_DURATION_HOURS or len(path) >= 10:
            return
        for ts, dst, amt in next_hops(last_dst, last_ts):
            is_cycle = dst == path[0][1]
            if dst in visited and not is_cycle:
                continue
            visited.add(dst)
            path.append((ts, last_dst, dst, amt))
            dfs(path, visited, start_time)
            path.pop()
            if not is_cycle:
                visited.discard(dst)

    for _, row in edges_f.iterrows():
        dfs([(row.timestamp, row.source_account, row.destination_account, row.amount)],
            {row.source_account, row.destination_account}, row.timestamp)

    events = pd.concat([
        df1[["timestamp", "source_account"]].rename(columns={"source_account": "account_id"}),
        df1[["timestamp", "destination_account"]].rename(columns={"destination_account": "account_id"})
    ]).sort_values("timestamp").reset_index(drop=True)
    baseline_map = dict(zip(df2.account_id, df2.baseline_monthly_txn_count))
    peak_counts = {}
    for account, group in events.groupby("account_id"):
        group = group.sort_values("timestamp").reset_index(drop=True)
        left, best = 0, 0
        for right in range(len(group)):
            while group.loc[right, "timestamp"] - group.loc[left, "timestamp"] > timedelta(hours=24):
                left += 1
            best = max(best, right - left + 1)
        peak_counts[account] = best
    velocity_flags = {a for a, cnt in peak_counts.items() if cnt >= 13 and cnt >= 3 * max(baseline_map[a] / 30, 0.5)}

    return {
        "fanout_flags": fanout_flags,
        "layer_flags": layer_flags,
        "velocity_flags": velocity_flags,
        "peak_counts": peak_counts,
        "baseline_map": baseline_map,
    }


# ---------------- feature construction (shared by training + serving) ----------------
def build_features(df1, df2, stage1):
    account_to_node = {a: i for i, a in enumerate(df2.account_id)}
    node_df = df2.copy()
    node_df["node_id"] = node_df.account_id.map(account_to_node)
    node_df = node_df.sort_values("node_id").reset_index(drop=True)

    out_deg = df1.groupby("source_account").size().reindex(df2.account_id, fill_value=0)
    in_deg = df1.groupby("destination_account").size().reindex(df2.account_id, fill_value=0)
    out_uniq = df1.groupby("source_account")["destination_account"].nunique().reindex(df2.account_id, fill_value=0)
    in_uniq = df1.groupby("destination_account")["source_account"].nunique().reindex(df2.account_id, fill_value=0)
    both = pd.concat([
        df1[["source_account", "amount"]].rename(columns={"source_account": "account_id"}),
        df1[["destination_account", "amount"]].rename(columns={"destination_account": "account_id"})
    ])
    max_amt = both.groupby("account_id")["amount"].max().reindex(df2.account_id, fill_value=0)
    total_amt = both.groupby("account_id")["amount"].sum().reindex(df2.account_id, fill_value=0)

    node_df["out_degree"] = node_df.account_id.map(out_deg)
    node_df["in_degree"] = node_df.account_id.map(in_deg)
    node_df["out_unique_dest"] = node_df.account_id.map(out_uniq)
    node_df["in_unique_src"] = node_df.account_id.map(in_uniq)
    node_df["max_amount"] = node_df.account_id.map(max_amt)
    node_df["total_amount"] = node_df.account_id.map(total_amt)
    node_df["flag_fanout"] = node_df.account_id.isin(stage1["fanout_flags"]).astype(int)
    node_df["flag_layering"] = node_df.account_id.isin(stage1["layer_flags"]).astype(int)
    node_df["flag_velocity"] = node_df.account_id.isin(stage1["velocity_flags"]).astype(int)

    acc_type_dummies = pd.get_dummies(node_df.account_type, prefix="type")
    numeric_cols = ["opened_days_ago", "baseline_monthly_txn_count", "baseline_avg_amount", "dormancy_flag",
                     "out_degree", "in_degree", "out_unique_dest", "in_unique_src", "max_amount", "total_amount"]
    numeric = node_df[numeric_cols].copy()
    numeric = (numeric - numeric.mean()) / numeric.std()
    flags_df = node_df[["flag_fanout", "flag_layering", "flag_velocity"]].astype(float)
    X = pd.concat([numeric, acc_type_dummies, flags_df], axis=1).astype(float)
    x = torch.tensor(X.values, dtype=torch.float)

    src = df1.source_account.map(account_to_node).values
    dst = df1.destination_account.map(account_to_node).values
    edge_index = torch.tensor(np.vstack([src, dst]), dtype=torch.long)

    return node_df, x, edge_index


# ---------------- Stage 2: GNN inference (loads trained weights) ----------------
def run_stage2(node_df, x, edge_index, model_path: str):
    in_dim = x.shape[1]
    model = FraudGraphSAGE(in_dim, 32, 4)
    if not Path(model_path).exists():
        raise FileNotFoundError("Trained GNN model not found. Please provide fraud_gnn_model.pt")
    model.load_state_dict(torch.load(model_path, map_location="cpu"))

    model.eval()
    with torch.no_grad():
        logits = model(x, edge_index)
        probs = F.softmax(logits, dim=1)
        pred = logits.argmax(dim=1)

    # Ground-truth columns (true_label, all_roles, is_suspicious, pattern_id,
    # pattern_type) exist only in the synthetic training/eval data and are
    # never read by this pipeline. Real bank data won't have them, and even
    # when present (as in our own accounts.csv) they are intentionally
    # ignored here so API output never depends on them.
    stage2 = node_df[["account_id"]].copy()
    stage2["predicted_label"] = [INV_LABEL_MAP[p] for p in pred.numpy()]
    for i, cls in INV_LABEL_MAP.items():
        stage2[f"prob_{cls}"] = probs[:, i].numpy().round(4)
    stage2["fraud_prob"] = (1 - stage2["prob_normal"]).round(4)
    return stage2


# ---------------- Stage 3: behavioural fusion ----------------
def run_stage3(stage2, df1, df2, stage1):
    peak_counts, baseline_map = stage1["peak_counts"], stage1["baseline_map"]
    dev = pd.DataFrame({"account_id": list(peak_counts.keys()), "peak_24h_count": list(peak_counts.values())})
    dev["expected_24h_count"] = dev.account_id.map(baseline_map).apply(lambda b: max(b / 30, 0.5))
    dev["velocity_ratio"] = (dev["peak_24h_count"] / dev["expected_24h_count"]).round(2)

    both = pd.concat([
        df1[["source_account", "amount"]].rename(columns={"source_account": "account_id"}),
        df1[["destination_account", "amount"]].rename(columns={"destination_account": "account_id"})
    ])
    max_amt = both.groupby("account_id")["amount"].max().reindex(df2.account_id, fill_value=0)
    baseline_amt_map = dict(zip(df2.account_id, df2.baseline_avg_amount))
    dev["max_amount"] = dev.account_id.map(max_amt)
    dev["amount_ratio"] = (dev["max_amount"] / dev.account_id.map(baseline_amt_map).clip(lower=1)).round(2)
    dev["velocity_score"] = dev["velocity_ratio"].clip(upper=20) / 20
    dev["amount_score"] = dev["amount_ratio"].clip(upper=15) / 15
    dev["deviation_score"] = (0.6 * dev["velocity_score"] + 0.4 * dev["amount_score"]).clip(upper=1.0)

    fused = stage2.merge(
        dev[["account_id", "peak_24h_count", "velocity_ratio", "amount_ratio", "deviation_score"]], on="account_id"
    )
    fused["final_risk"] = (0.6 * fused["fraud_prob"] + 0.4 * fused["deviation_score"]).round(4)

    def tier(r):
        if r < 0.4:
            return "auto_monitor"
        elif r < 0.75:
            return "escalate_analyst"
        return "freeze_review"

    fused["action_tier"] = fused["final_risk"].apply(tier)
    fused["flag_fanout"] = fused.account_id.isin(stage1["fanout_flags"])
    fused["flag_layering"] = fused.account_id.isin(stage1["layer_flags"])
    fused["flag_velocity"] = fused.account_id.isin(stage1["velocity_flags"])
    return fused


# ---------------- Stage 4: evidence generation ----------------
def run_stage4(fused):
    def make_evidence(row):
        reasons = []
        if row.flag_fanout:
            reasons.append("fanned out to many accounts within 24h")
        if row.flag_layering:
            reasons.append("part of a multi-hop transaction chain/cycle")
        if row.flag_velocity:
            reasons.append(f"activity spike: {row.peak_24h_count} transactions in 24h vs baseline")
        if row.amount_ratio > 5:
            reasons.append(f"transaction amount {row.amount_ratio}x its usual size")
        if not reasons:
            reasons.append("no rule-based trigger; flagged by graph pattern alone" if row.action_tier != "auto_monitor" else "activity within normal range")
        return f"GNN predicts '{row.predicted_label}' (confidence {row.fraud_prob:.2f}). Signals: {'; '.join(reasons)}. Combined risk score {row.final_risk:.2f} -> {row.action_tier}."

    fused = fused.copy()
    fused["evidence_text"] = fused.apply(make_evidence, axis=1)
    return fused


def run_full_pipeline(data_dir: str, model_path: str):
    """Runs Stage 1 -> 2 -> 3 -> 4 live and returns the final scored dataframe + raw transactions."""
    df1, df2 = load_data(data_dir)
    stage1 = run_stage1(df1, df2)
    node_df, x, edge_index = build_features(df1, df2, stage1)
    stage2 = run_stage2(node_df, x, edge_index, model_path)
    stage3 = run_stage3(stage2, df1, df2, stage1)
    final = run_stage4(stage3)
    return final, df1