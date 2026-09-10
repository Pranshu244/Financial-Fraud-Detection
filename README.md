![Python](https://img.shields.io/badge/Python-3.13-blue)
![PyTorch](https://img.shields.io/badge/PyTorch-Deep%20Learning-orange)
![PyTorch Geometric](https://img.shields.io/badge/PyTorch%20Geometric-GNN-red)
![FastAPI](https://img.shields.io/badge/FastAPI-API-green)
![React](https://img.shields.io/badge/React-Frontend-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Styling-06B6D4)

# VittRakshak — Financial Fraud Detection

**VittRakshak** is an AI-driven financial crime detection system designed to uncover coordinated fraud patterns that may remain hidden when transactions are analyzed individually.

Instead of treating each transaction as an isolated event, VittRakshak connects **transactions, accounts, behaviour, and time** to identify suspicious activity across a financial network.

The system combines **temporal pattern detection, Graph Neural Networks, behavioural analysis, risk scoring, and evidence generation** to help analysts move from a suspicious alert to an actionable investigation.

---

## Problem Statement

The most damaging financial fraud is often distributed across multiple accounts and transactions rather than appearing as a single obviously fraudulent transfer.

Criminal networks can:

- Spread money across multiple accounts
- Use small or seemingly legitimate transactions
- Move funds through multiple transaction layers
- Rapidly change account relationships
- Generate large volumes of activity that are difficult to trace manually

Traditional transaction-level detection can identify individual suspicious transactions, but connecting those alerts into a **coordinated fraud pattern** remains challenging.

VittRakshak addresses this problem by analyzing financial activity as an **evolving transaction network** rather than as isolated transactions.

---

## Solution Overview

VittRakshak processes account and transaction data through a multi-stage detection pipeline.

The system:

- Detects suspicious **temporal transaction patterns**
- Builds account-level graph features from transaction relationships
- Uses a **GraphSAGE-based Graph Neural Network** to identify suspicious account roles
- Compares account activity against its behavioural baseline
- Produces a combined **fraud risk score**
- Assigns an appropriate **action tier**
- Generates evidence explaining why an account was flagged
- Exposes the suspicious transaction network for investigation

The resulting dashboard allows analysts to inspect suspicious accounts, their risk levels, supporting signals, and connected transaction trails.

---

# System Architecture

The detection pipeline is implemented as **four major stages**, with Stage 1 containing three temporal detection mechanisms.

### Overall Pipeline

```text
Accounts + Transactions
          ↓
Stage 1 — Temporal Pattern Detection
          ↓
Stage 2 — GraphSAGE GNN
          ↓
Stage 3 — Behavioural Risk Fusion
          ↓
Stage 4 — Evidence, Risk & Action
```

---

## Stage 1 — Temporal Pattern Detection

The first stage looks for suspicious transaction behaviour across **time windows and transaction relationships**.

### 1A. Fanout Detection

Identifies accounts that send transactions to a large number of unique destination accounts within a short time window.

Current detection logic:

- 24-hour time window
- At least 10 unique destinations

This helps identify accounts distributing funds rapidly across many accounts.

---

### 1B. Layering Detection

Searches for high-value multi-hop transaction chains and cycles that may indicate movement of funds through several accounts.

The detection considers:

- Transactions of at least `200,000`
- Minimum 3 hops
- Maximum 100 hours between consecutive hops
- Maximum total duration of 300 hours
- Branch exploration limited to 5 paths
- Path exploration up to 10 hops

This helps uncover **multi-layer movement of funds** that may not appear suspicious at the individual transaction level.

---

### 1C. Velocity Detection

Measures unusual transaction activity by comparing an account's peak 24-hour transaction count against its expected activity.

An account is flagged when:

- Peak activity reaches at least 13 transactions in 24 hours
- Activity is at least 3 times its expected daily baseline

This detects sudden bursts of activity that deviate from an account's normal behaviour.

---

## Stage 2 — GraphSAGE Graph Neural Network

Transaction relationships are represented as a directed graph:

```text
Account → Transaction → Account
```

Each account is represented as a **graph node**, while transactions create connections between accounts.

Node features include:

- Account type
- Account age
- Monthly transaction baseline
- Average transaction amount
- Dormancy status
- In-degree and out-degree
- Unique incoming and outgoing counterparties
- Maximum transaction amount
- Total transaction amount
- Temporal detection flags

### GraphSAGE Architecture

The model uses two **SAGEConv** layers:

```text
Node Features
      ↓
SAGEConv
      ↓
ReLU
      ↓
Dropout (0.3)
      ↓
SAGEConv
      ↓
4-Class Output
```

The model predicts four account roles:

- `normal`
- `mule`
- `layering_node`
- `structuring_source`

The output probabilities are used to calculate the account's **fraud probability**.

---

## Stage 3 — Behavioural Risk Fusion

Graph-based predictions are combined with account-level behavioural deviations.

Two major behavioural signals are calculated:

### Transaction Velocity

```text
Velocity Ratio =
Peak 24-Hour Transactions / Expected 24-Hour Transactions
```

### Transaction Amount

```text
Amount Ratio =
Maximum Transaction Amount / Baseline Average Amount
```

These signals are combined into a behavioural deviation score.

The final risk score combines the GNN fraud probability with behavioural deviation:

```text
Final Risk =
0.6 × Fraud Probability
+
0.4 × Behavioural Deviation
```

---

## Stage 4 — Evidence, Risk & Action

The final stage combines the model output, temporal detection signals, and behavioural deviations to produce the complete investigation result.

The stage generates:

- **Fraud probability**
- **Behavioural deviation**
- **Final risk score**
- **Predicted account role**
- **Detection evidence**
- **Human-readable explanation**
- **Recommended action tier**

### Action Tiers

| Risk Score | Action Tier |
|---|---|
| `< 0.40` | Auto Monitor |
| `0.40 – 0.74` | Escalate Analyst |
| `≥ 0.75` | Freeze Review |

This allows the system to move beyond simply identifying suspicious accounts and instead **prioritize the appropriate level of intervention with supporting evidence**.

---

# Dynamic Transaction Network Investigation

VittRakshak provides graph exploration for suspicious accounts.

For a selected account, the system can retrieve connected accounts and transactions across multiple hops.

Each connection contains:

- Source account
- Destination account
- Transaction amount
- Timestamp
- Transaction channel

The dashboard can therefore move from:

```text
Suspicious Account
       ↓
Connected Accounts
       ↓
Transaction Relationships
       ↓
Hidden Money Trail
```

This helps analysts investigate the broader context surrounding an individual suspicious account.

---

# Technology Stack

### AI / Machine Learning

- PyTorch
- PyTorch Geometric
- GraphSAGE
- Scikit-learn

### Data Processing & Graph Analysis

- Pandas
- NumPy
- NetworkX

### Backend

- Python
- FastAPI

### Frontend

- React
- Tailwind CSS
- Vite
- Framer Motion
- Lucide React

### Deployment

- Docker

---

# Backend API

The backend is implemented using **FastAPI** and runs the complete detection pipeline.

The pipeline executes on startup and can also be triggered again through the API.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/pipeline/run` | Recomputes the complete detection pipeline |
| GET | `/pipeline/status` | Returns latest pipeline execution status |
| POST | `/pipeline/upload` | Uploads new account and transaction datasets and reruns detection |
| GET | `/health` | Returns API and loaded account status |
| GET | `/stats/summary` | Returns account, risk tier and predicted role statistics |
| GET | `/flagged` | Returns highest-risk flagged accounts |
| GET | `/accounts/{account_id}/risk` | Returns risk score and action tier |
| GET | `/accounts/{account_id}/evidence` | Returns detection signals and explanation |
| GET | `/accounts/{account_id}/graph` | Returns connected account and transaction graph |

---

## Dataset Upload & Validation

The API supports uploading new `accounts.csv` and `transactions.csv` files.

Before replacing the active dataset, the backend validates:

- Required columns
- Duplicate account IDs
- Timestamp parsing
- Numeric transaction amounts
- Account references
- Orphan source or destination accounts

If validation succeeds, the new data is loaded and the complete pipeline is recomputed.

This allows the prototype to demonstrate **inference on a newly uploaded dataset** rather than relying only on precomputed results.

---

# Frontend Dashboard

The React-based frontend provides an interactive interface for exploring the fraud detection results.

The dashboard provides views for:

- Overall fraud detection statistics
- Risk tiers
- Flagged accounts
- Account-level risk scores
- Detection evidence
- Connected transaction networks
- Dataset upload
- Pipeline execution status
- Analyst-focused investigation

The interface uses **Tailwind CSS** for responsive layouts and dashboard styling, with **Framer Motion** for interactive animations.

---

# Impact

VittRakshak is designed to help financial crime analysts:

- Detect coordinated activity spread across multiple accounts
- Identify hidden transaction relationships
- Prioritize suspicious accounts based on contextual risk
- Understand the evidence behind an alert
- Trace transaction paths surrounding suspicious accounts
- Move from isolated alerts toward network-based investigation

> **VittRakshak — Tracing Financial Crime Across Patterns**

---

# Prototype Demonstration
