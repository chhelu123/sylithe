# Sylithe Backend

Python FastAPI backend for LULC analysis using Google Earth Engine.

## Setup

1. **Install dependencies**
```bash
pip install -r requirements.txt
```

2. **Configure Google Earth Engine**
   - Create a Google Cloud Project
   - Enable Earth Engine API
   - Create a Service Account and download JSON key
   - Copy `.env.example` to `.env` and update:
     - `GEE_SERVICE_ACCOUNT`
     - `GEE_PRIVATE_KEY_PATH`

3. **Run the server**
```bash
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

### `POST /api/lulc/analyze`
Generate LULC map from AOI polygon.

**Request:**
```json
{
  "aoi": {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [[[72.8,19.1],[72.9,19.1],[72.9,19.2],[72.8,19.2],[72.8,19.1]]]
    }
  },
  "start_date": "2023-01-01",
  "end_date": "2023-12-31"
}
```

**Response:**
```json
{
  "tile_url": "https://earthengine.googleapis.com/...",
  "stats": {"0": 1234, "1": 5678},
  "aoi_area_km2": 123.45
}
```

### `GET /api/health`
Health check endpoint.
