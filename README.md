# Sylithe - Carbon Intelligence Platform

Enterprise-grade Land Use/Land Cover (LULC) analysis platform with Google Earth Engine integration for carbon credit monitoring and ESG compliance.

## 🌱 Features

- **LULC Analysis**: Real-time land cover analysis using Google Dynamic World (10m resolution)
- **Timeline Analysis**: Year-by-year comparison (2018-2023)
- **Carbon Intelligence**: 
  - Baseline & Version Control
  - Change Detection Engine
  - Carbon Risk Assessment
  - Leakage & Buffer Analysis
- **Interactive Map**: Draw polygons, satellite/street view toggle, geolocation
- **Professional UI**: Clean white interface with lime green accents

## 🏗️ Architecture

```
Frontend (React + Vite) → Backend (FastAPI) → Google Earth Engine → Tile URL → Frontend
```

## 📦 Tech Stack

**Backend:**
- Python 3.8+
- FastAPI
- Google Earth Engine API
- SQLite

**Frontend:**
- React 18
- Vite
- Leaflet + Leaflet Draw

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Google Earth Engine service account

### Backend Setup

1. Navigate to backend:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure Google Earth Engine:
   - Create a GEE service account
   - Download the JSON key file
   - Place it as `backend/gee-key.json`
   - Create `.env` file:
```env
GEE_SERVICE_ACCOUNT=your-service-account@project.iam.gserviceaccount.com
GEE_PRIVATE_KEY_PATH=gee-key.json
CORS_ORIGINS=http://localhost:5173
MAX_AOI_AREA_KM2=10000
```

4. Run backend:
```bash
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

1. Navigate to frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open browser at `http://localhost:5173`

## 📊 API Endpoints

- `GET /api/health` - Health check
- `POST /api/lulc/analyze` - Single year LULC analysis
- `POST /api/lulc/timeline` - Multi-year timeline analysis
- `POST /api/baseline/create` - Create baseline snapshot
- `POST /api/baseline/lock` - Lock baseline permanently
- `POST /api/change-detection` - Detect LULC changes
- `POST /api/risk-assessment` - Assess carbon risk
- `POST /api/leakage-analysis` - Analyze buffer zone leakage

## 🔒 Security

- GEE credentials stored securely in backend only
- CORS protection
- AOI size validation
- Full audit trail in SQLite

## 📝 License

MIT

## 👥 Contributors

Built with ❤️ for carbon intelligence
