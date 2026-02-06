# Google Earth Engine–First LULC Architecture
## Backend‑Mediated, Tile‑Based Design for Sylithe (Enterprise‑Ready)

> **Audience**: This document is written for senior engineers, cloud architects, and AI assistants (e.g., Amazon Q) to clearly understand how Google Earth Engine (GEE) can be used to *directly* generate LULC maps while still following correct security, scalability, and enterprise architecture practices.

> **Key takeaway upfront**:  
> **Yes, Google Earth Engine can directly generate LULC maps and serve them as tiles that are rendered in the frontend.**  
> **However, the frontend must never connect directly to GEE. A thin backend layer is mandatory.**

---

## 1. Problem Statement

Sylithe needs to allow corporate buyers to:
- Upload or draw land polygons (AOIs)
- Instantly visualize accurate LULC maps
- Trust the provenance, accuracy, and auditability of results
- Scale from small demos to enterprise‑grade usage

The challenge is to achieve **instant LULC visualization** without compromising:
- Security of credentials
- API quota control
- Enterprise compliance
- System scalability

---

## 2. Fundamental Design Principle

### ❌ Incorrect (Do NOT do this)

```
Frontend → Google Earth Engine
```

Reasons this is unacceptable:
- GEE credentials would be exposed
- No usage control or billing enforcement
- No audit logs or governance
- Violates enterprise security standards

---

### ✅ Correct (Production‑Grade)

```
Frontend → Backend (Thin API) → Google Earth Engine → Tile URL → Frontend
```

In this architecture:
- GEE does the heavy geospatial computation
- Backend handles authentication, validation, and governance
- Frontend only renders tiles and visual outputs

---

## 3. High‑Level System Flow

```
1. User draws or uploads polygon (AOI)
2. Frontend sends GeoJSON + parameters to backend
3. Backend validates AOI and request
4. Backend queries GEE for LULC
5. GEE generates LULC raster
6. Backend receives tile URL
7. Frontend renders LULC tiles on map
```

This flow enables **near‑instant results** while remaining secure.

---

## 4. AOI (Polygon) Handling

### 4.1 Frontend Responsibility

The frontend is responsible for:
- Capturing geometry (draw / upload)
- Converting all inputs to **GeoJSON**
- Sending AOI + parameters to backend

Example payload:

```json
{
  "aoi": {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [[[72.8,19.1],[72.9,19.1],[72.9,19.2],[72.8,19.2],[72.8,19.1]]]
    }
  },
  "analysis": "lulc",
  "start_date": "2023-01-01",
  "end_date": "2023-12-31"
}
```

---

### 4.2 Backend Responsibility

The backend:
- Validates AOI size and geometry
- Converts GeoJSON to GEE geometry
- Enforces per‑organization limits

```python
import ee

def geojson_to_ee(aoi_geojson):
    coords = aoi_geojson["geometry"]["coordinates"]
    return ee.Geometry.Polygon(coords)
```

---

## 5. Google Earth Engine Authentication (Mandatory)

### 5.1 Authentication Model

- Google Cloud Project
- Earth Engine API enabled
- Service Account credentials

**Never** use personal OAuth tokens in production.

The backend initializes GEE once using the service account and reuses the session.

---

## 6. Direct LULC Generation Using GEE (No Custom ML)

GEE already provides **production‑ready LULC datasets**.

### 6.1 Recommended Dataset: Dynamic World

Dynamic World provides:
- Near‑real‑time LULC
- 10‑meter resolution
- Globally consistent classes

LULC classes include:
- Water
- Trees
- Grass
- Crops
- Shrub & scrub
- Built‑up
- Bare ground
- Snow / ice

---

### 6.2 LULC Computation Logic

```python
aoi = geojson_to_ee(aoi_geojson)

dw = (
  ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1")
  .filterBounds(aoi)
  .filterDate(start_date, end_date)
)

lulc = dw.select("label").mode().clip(aoi)
```

At this stage, **LULC raster is already computed**.

---

## 7. Serving LULC Results as Map Tiles

### 7.1 Why Tiles Are Critical

- Instant rendering
- No large downloads
- Scales globally
- Works with Mapbox, Leaflet, deck.gl

---

### 7.2 Generating Tile URL from GEE

```python
map_id = lulc.getMapId({
  "min": 0,
  "max": 8,
  "palette": [
    "#419BDF", "#397D49", "#88B053", "#7A87C6",
    "#E49635", "#DFC35A", "#C4281B", "#A59B8F", "#B39FE1"
  ]
})

tile_url = map_id["tile_fetcher"].url_format
```

The backend returns **only this tile URL** to the frontend.

---

## 8. Frontend Rendering

Frontend treats GEE output like any other raster layer:

```js
map.addSource("lulc", {
  type: "raster",
  tiles: [tileUrl],
  tileSize: 256
})

map.addLayer({
  id: "lulc-layer",
  type: "raster",
  source: "lulc"
})
```

No knowledge of GEE is required in the frontend.

---

## 9. Statistics & Analytics (Optional but Recommended)

GEE can compute statistics **without exporting data**.

```python
stats = lulc.reduceRegion(
  reducer=ee.Reducer.frequencyHistogram(),
  geometry=aoi,
  scale=10
)
```

Returned values are used for:
- Area by land‑use class
- Percentage breakdown
- Charts and dashboards

---

## 10. Security & Governance Model

Mandatory controls:
- Backend‑only GEE access
- AOI size thresholds
- Rate limiting per organization
- Cached results for identical AOIs
- Full audit logs

This model is compliant with:
- Enterprise security reviews
- ESG / MRV audit expectations
- Cloud governance standards

---

## 11. Scalability Characteristics

This architecture scales because:
- GEE handles geospatial computation
- Backend remains stateless and thin
- Frontend renders lightweight tiles
- No raster storage is required

It supports:
- 10 users → 10,000+ users
- Country‑scale AOIs
- Multi‑tenant organizations

---

## 12. Product Strategy Implication (Important)

Recommended tiering:

| Tier | LULC Source | Latency | Cost |
|----|------------|--------|------|
| Preview | Dynamic World (GEE) | Seconds | Low |
| Pro | Custom RF in GEE | Minutes | Medium |
| Enterprise | DL + field data | Hours | High |

This allows Sylithe to monetize **without over‑engineering**.

---

## 13. Final Conclusion

**Yes, Google Earth Engine can directly generate LULC maps that are instantly visualized in the frontend.**

**However, the only correct way to do this in production is:**

> **Frontend → Thin Backend → GEE → Tile URL → Frontend**

This design is:
- Secure
- Scalable
- Cost‑efficient
- Enterprise‑ready

---

**This document defines the canonical GEE‑first LULC architecture for Sylithe.**

