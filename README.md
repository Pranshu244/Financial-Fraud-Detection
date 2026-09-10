# Financial-Fraud-Detection
AI-powered financial fraud detection system that traces suspicious activity across transaction networks and behavioral patterns using temporal rule-based detection, Graph Neural Networks, and risk-based escalation.

## Project Structure

```
Financial-Fraud-Detection/
├── Backend/          # FastAPI Python backend (GNN models, risk pipeline, APIs)
├── Frontend/         # React + Vite + Tailwind CSS frontend dashboard
├── start_all.bat     # Windows Batch launcher for Backend & Frontend
├── start_all.ps1     # PowerShell launcher for Backend & Frontend
└── README.md
```

## Quick Start

### Option 1: One-Click Startup (Windows)
Run `start_all.bat` or `start_all.ps1` to launch both Backend and Frontend in separate terminal windows:
```powershell
.\start_all.ps1
```

### Option 2: Manual Startup

**1. Backend Server:**
```bash
cd Backend
pip install -r backend_requirements.txt
python -m uvicorn main:app --reload --port 8000
```
Backend API will run at `http://localhost:8000` (Docs: `http://localhost:8000/docs`).

**2. Frontend Web UI:**
```bash
cd Frontend
npm install
npm run dev
```
Frontend UI will run at `http://localhost:3000` (or `http://localhost:5173`).

