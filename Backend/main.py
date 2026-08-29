import io
import time
from pathlib import Path
from fastapi import FastAPI, File, HTTPException, Query, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

import pipeline

DATA_DIR = str(Path(__file__).parent / "data")
MODEL_PATH = str(Path(__file__).parent / "data" / "fraud_gnn_model.pt")

app = FastAPI(title="Build Bank Fraud Detection API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# in-memory state, populated by the pipeline (no CSV of results is read at request time)
state = {"results": None, "transactions": None, "last_run_seconds": None, "last_run_at": None}


def _run_and_store():
    start = time.time()
    results, txns = pipeline.run_full_pipeline(DATA_DIR, MODEL_PATH)
    state["results"] = results
    state["transactions"] = txns
    state["last_run_seconds"] = round(time.time() - start, 2)
    state["last_run_at"] = time.strftime("%Y-%m-%d %H:%M:%S")


@app.on_event("startup")
def startup():
    _run_and_store()


@app.post("/pipeline/run")
def rerun_pipeline():
    """Re-runs Stage 1 -> 2 -> 3 -> 4 live, in memory. This is what to trigger on stage for the demo."""
    _run_and_store()
    return {
        "status": "recomputed",
        "seconds_taken": state["last_run_seconds"],
        "accounts_scored": len(state["results"]),
        "ran_at": state["last_run_at"],
    }


@app.get("/pipeline/status")
def pipeline_status():
    return {
        "last_run_at": state["last_run_at"],
        "last_run_seconds": state["last_run_seconds"],
        "accounts_scored": len(state["results"]) if state["results"] is not None else 0,
    }

REQUIRED_ACCOUNT_COLS = [
    "account_id", "account_type", "opened_days_ago",
    "baseline_monthly_txn_count", "baseline_avg_amount", "dormancy_flag",
]
REQUIRED_TXN_COLS = ["timestamp", "source_account", "destination_account", "amount", "channel"]


def _validate_upload(accounts_df: pd.DataFrame, txns_df: pd.DataFrame):
    errors = []

    missing_acc_cols = [c for c in REQUIRED_ACCOUNT_COLS if c not in accounts_df.columns]
    if missing_acc_cols:
        errors.append(f"accounts.csv missing required columns: {missing_acc_cols}")

    missing_txn_cols = [c for c in REQUIRED_TXN_COLS if c not in txns_df.columns]
    if missing_txn_cols:
        errors.append(f"transactions.csv missing required columns: {missing_txn_cols}")

    if errors:
        raise HTTPException(status_code=400, detail=errors)

    if accounts_df["account_id"].duplicated().any():
        errors.append("accounts.csv has duplicate account_id values")

    try:
        pd.to_datetime(txns_df["timestamp"])
    except Exception:
        errors.append("transactions.csv 'timestamp' column has unparseable values")

    if not pd.api.types.is_numeric_dtype(txns_df["amount"]):
        errors.append("transactions.csv 'amount' column must be numeric")

    known_accounts = set(accounts_df["account_id"])
    orphan_src = set(txns_df["source_account"]) - known_accounts
    orphan_dst = set(txns_df["destination_account"]) - known_accounts
    orphans = orphan_src | orphan_dst
    if orphans:
        sample = list(orphans)[:10]
        errors.append(
            f"transactions.csv references {len(orphans)} account_id(s) not present in accounts.csv "
            f"(e.g. {sample})"
        )

    if errors:
        raise HTTPException(status_code=400, detail=errors)


@app.post("/pipeline/upload")
async def upload_and_run(
    accounts_file: UploadFile = File(...),
    transactions_file: UploadFile = File(...),
):
    """Accepts a new accounts.csv + transactions.csv, validates them, and if
    valid, replaces the active dataset and re-runs the full pipeline live.
    Existing data is left untouched if validation fails."""
    accounts_bytes = await accounts_file.read()
    txns_bytes = await transactions_file.read()

    try:
        new_accounts_df = pd.read_csv(io.BytesIO(accounts_bytes))
        new_txns_df = pd.read_csv(io.BytesIO(txns_bytes), parse_dates=["timestamp"])
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"could not parse uploaded CSV(s): {e}")

    _validate_upload(new_accounts_df, new_txns_df)

    Path(DATA_DIR, "accounts.csv").write_bytes(accounts_bytes)
    Path(DATA_DIR, "transactions.csv").write_bytes(txns_bytes)

    _run_and_store()
    return {
        "status": "uploaded and recomputed",
        "accounts_loaded": len(new_accounts_df),
        "transactions_loaded": len(new_txns_df),
        "seconds_taken": state["last_run_seconds"],
        "by_tier": state["results"]["action_tier"].value_counts().to_dict(),
    }

@app.get("/health")
def health():
    return {"status": "ok", "accounts_loaded": len(state["results"]) if state["results"] is not None else 0}


@app.get("/stats/summary")
def summary():
    r = state["results"]
    return {
        "total_accounts": len(r),
        "by_tier": r["action_tier"].value_counts().to_dict(),
        "by_predicted_role": r["predicted_label"].value_counts().to_dict(),
        "last_run_at": state["last_run_at"],
        "last_run_seconds": state["last_run_seconds"],
    }


@app.get("/flagged")
def flagged(tier: str | None = Query(default=None), limit: int = 50):
    r = state["results"]
    if tier:
        r = r[r["action_tier"] == tier]
    r = r.sort_values("final_risk", ascending=False).head(limit)
    return r[["account_id", "predicted_label", "final_risk", "action_tier"]].to_dict(orient="records")


@app.get("/accounts/{account_id}/risk")
def account_risk(account_id: str):
    row = state["results"][state["results"].account_id == account_id]
    if row.empty:
        raise HTTPException(status_code=404, detail="account not found")
    row = row.iloc[0]
    return {
        "account_id": account_id,
        "predicted_label": row.predicted_label,
        "fraud_prob": float(row.fraud_prob),
        "deviation_score": float(row.deviation_score),
        "final_risk": float(row.final_risk),
        "action_tier": row.action_tier,
    }


@app.get("/accounts/{account_id}/evidence")
def account_evidence(account_id: str):
    row = state["results"][state["results"].account_id == account_id]
    if row.empty:
        raise HTTPException(status_code=404, detail="account not found")
    row = row.iloc[0]
    return {
        "account_id": account_id,
        "action_tier": row.action_tier,
        "final_risk": float(row.final_risk),
        "signals": {
            "fanout_flag": bool(row.flag_fanout),
            "layering_flag": bool(row.flag_layering),
            "velocity_flag": bool(row.flag_velocity),
            "peak_24h_transaction_count": int(row.peak_24h_count),
            "amount_vs_baseline_ratio": float(row.amount_ratio),
        },
        "explanation": row.evidence_text,
    }


@app.get("/accounts/{account_id}/graph")
def account_graph(account_id: str, hops: int = 1):
    results, txns = state["results"], state["transactions"]
    row = results[results.account_id == account_id]
    if row.empty:
        raise HTTPException(status_code=404, detail="account not found")

    frontier, visited, edges = {account_id}, {account_id}, []
    for _ in range(hops):
        next_frontier = set()
        involved = txns[txns.source_account.isin(frontier) | txns.destination_account.isin(frontier)]
        for _, t in involved.iterrows():
            edges.append({
                "source": t.source_account, "target": t.destination_account,
                "amount": float(t.amount), "timestamp": t.timestamp.isoformat(), "channel": t.channel,
            })
            next_frontier.add(t.source_account)
            next_frontier.add(t.destination_account)
        frontier = next_frontier - visited
        visited |= next_frontier

    nodes = results[results.account_id.isin(visited)][
        ["account_id", "predicted_label", "final_risk", "action_tier"]
    ].to_dict(orient="records")
    return {"center": account_id, "nodes": nodes, "edges": edges}
