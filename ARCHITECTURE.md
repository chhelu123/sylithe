# Sylithe Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              React Frontend (Port 5173)                 │    │
│  │                                                          │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │    │
│  │  │   Map.jsx    │  │ StatsPanel   │  │   App.jsx    │ │    │
│  │  │  (Leaflet)   │  │   .jsx       │  │              │ │    │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │    │
│  │         │                  │                  │         │    │
│  │         └──────────────────┴──────────────────┘         │    │
│  │                          │                               │    │
│  │                   ┌──────▼──────┐                       │    │
│  │                   │   api.js    │                       │    │
│  │                   └─────────────┘                       │    │
│  └────────────────────────┬─────────────────────────────────┘    │
└────────────────────────────┼──────────────────────────────────────┘
                             │
                             │ HTTP POST /api/lulc/analyze
                             │ { aoi, start_date, end_date }
                             │
┌────────────────────────────▼──────────────────────────────────────┐
│                  FastAPI Backend (Port 8000)                      │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                      main.py                              │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │  1. Receive AOI request                            │  │   │
│  │  │  2. Validate AOI size                              │  │   │
│  │  │  3. Check cache (database.py)                      │  │   │
│  │  │  4. If not cached → call gee_service.py            │  │   │
│  │  │  5. Return tile_url + stats                        │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                             │                                     │
│         ┌───────────────────┼───────────────────┐                │
│         │                   │                   │                │
│  ┌──────▼──────┐   ┌────────▼────────┐   ┌─────▼──────┐        │
│  │ gee_service │   │   database.py   │   │ schemas.py │        │
│  │    .py      │   │                 │   │            │        │
│  │             │   │  ┌───────────┐  │   │  Pydantic  │        │
│  │ - init_gee  │   │  │  cache    │  │   │  Models    │        │
│  │ - generate  │   │  │  table    │  │   └────────────┘        │
│  │   _lulc     │   │  └───────────┘  │                          │
│  │             │   │  ┌───────────┐  │                          │
│  │             │   │  │ requests  │  │                          │
│  │             │   │  │  table    │  │                          │
│  └──────┬──────┘   │  └───────────┘  │                          │
│         │          │                 │                          │
│         │          │  SQLite DB      │                          │
│         │          └─────────────────┘                          │
└─────────┼────────────────────────────────────────────────────────┘
          │
          │ Earth Engine API Call
          │ ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1")
          │
┌─────────▼──────────────────────────────────────────────────────┐
│              Google Earth Engine (GEE)                          │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │         Dynamic World LULC Dataset                      │   │
│  │                                                          │   │
│  │  1. Filter by AOI bounds                                │   │
│  │  2. Filter by date range                                │   │
│  │  3. Compute mode (most common class)                    │   │
│  │  4. Clip to AOI                                         │   │
│  │  5. Generate map tiles                                  │   │
│  │  6. Compute statistics                                  │   │
│  └────────────────────────────────────────────────────────┘   │
│                             │                                   │
│                             │ Returns:                          │
│                             │ - tile_url                        │
│                             │ - statistics                      │
└─────────────────────────────┼─────────────────────────────────┘
                              │
                              │ Tile URL returned to backend
                              │
┌─────────────────────────────▼─────────────────────────────────┐
│                    Backend Response                            │
│                                                                 │
│  {                                                              │
│    "tile_url": "https://earthengine.googleapis.com/...",      │
│    "stats": { "0": 1234, "1": 5678, ... },                   │
│    "aoi_area_km2": 123.45                                     │
│  }                                                              │
└─────────────────────────────┬─────────────────────────────────┘
                              │
                              │ JSON Response
                              │
┌─────────────────────────────▼─────────────────────────────────┐
│                    Frontend Rendering                          │
│                                                                 │
│  1. Receive tile_url                                           │
│  2. Add tile layer to Leaflet map                             │
│  3. Display LULC visualization                                │
│  4. Show statistics in panel                                  │
└────────────────────────────────────────────────────────────────┘
```

## Data Flow Sequence

```
User Action          Frontend              Backend              GEE              Database
    │                   │                     │                  │                  │
    │ Draw Polygon      │                     │                  │                  │
    ├──────────────────>│                     │                  │                  │
    │                   │                     │                  │                  │
    │                   │ POST /analyze       │                  │                  │
    │                   ├────────────────────>│                  │                  │
    │                   │                     │                  │                  │
    │                   │                     │ Check Cache      │                  │
    │                   │                     ├─────────────────────────────────────>│
    │                   │                     │                  │                  │
    │                   │                     │ Cache Miss       │                  │
    │                   │                     │<─────────────────────────────────────┤
    │                   │                     │                  │                  │
    │                   │                     │ Query LULC       │                  │
    │                   │                     ├─────────────────>│                  │
    │                   │                     │                  │                  │
    │                   │                     │                  │ Process          │
    │                   │                     │                  │ Generate Tiles   │
    │                   │                     │                  │                  │
    │                   │                     │ Tile URL + Stats │                  │
    │                   │                     │<─────────────────┤                  │
    │                   │                     │                  │                  │
    │                   │                     │ Save Cache       │                  │
    │                   │                     ├─────────────────────────────────────>│
    │                   │                     │                  │                  │
    │                   │ Response            │                  │                  │
    │                   │<────────────────────┤                  │                  │
    │                   │                     │                  │                  │
    │                   │ Render Tiles        │                  │                  │
    │                   ├──────────────────┐  │                  │                  │
    │                   │                  │  │                  │                  │
    │ View LULC Map     │<─────────────────┘  │                  │                  │
    │<──────────────────┤                     │                  │                  │
```

## Component Responsibilities

### Frontend (React + Vite)
- ✅ User interface
- ✅ Map rendering (Leaflet)
- ✅ Polygon drawing tools
- ✅ GeoJSON capture
- ✅ API communication
- ✅ Tile overlay display
- ✅ Statistics visualization

### Backend (FastAPI)
- ✅ API endpoints
- ✅ Request validation
- ✅ GEE authentication
- ✅ AOI size enforcement
- ✅ Cache management
- ✅ Audit logging
- ✅ CORS security

### Google Earth Engine
- ✅ Satellite imagery processing
- ✅ LULC classification
- ✅ Tile generation
- ✅ Statistics computation
- ✅ Geospatial operations

### Database (SQLite)
- ✅ Request caching
- ✅ Audit trail
- ✅ Performance optimization

## Security Layers

```
┌─────────────────────────────────────────┐
│         Frontend (Public)               │
│  - No credentials                       │
│  - CORS restricted                      │
└──────────────┬──────────────────────────┘
               │
               │ HTTPS (Production)
               │
┌──────────────▼──────────────────────────┐
│         Backend (Protected)             │
│  - GEE credentials stored               │
│  - Environment variables                │
│  - Rate limiting                        │
│  - AOI validation                       │
└──────────────┬──────────────────────────┘
               │
               │ Service Account Auth
               │
┌──────────────▼──────────────────────────┐
│    Google Earth Engine (Secure)         │
│  - Service account only                 │
│  - API quotas enforced                  │
└─────────────────────────────────────────┘
```

---

**This architecture ensures security, scalability, and enterprise compliance.**
