# Sylithe - System Design Document

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  React 18 + Vite (Frontend)                              │   │
│  │  - Leaflet Map Interface                                 │   │
│  │  - Analytics Dashboard (Recharts)                        │   │
│  │  - Control Panel & Forms                                 │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP/REST
┌─────────────────────────────────────────────────────────────────┐
│                       APPLICATION LAYER                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  FastAPI (Backend)                                       │   │
│  │  - REST API Endpoints                                    │   │
│  │  - Request Validation (Pydantic)                         │   │
│  │  - Business Logic Services                               │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                        SERVICE LAYER                             │
│  ┌──────────────┬──────────────┬──────────────┬─────────────┐   │
│  │ GEE Service  │ DACB Service │ KNN Service  │ Risk/Leak   │   │
│  │ - LULC Gen   │ - Baseline   │ - Control    │ - Assessment│   │
│  │ - Tile URLs  │ - Credits    │ - Selection  │ - Analysis  │   │
│  └──────────────┴──────────────┴──────────────┴─────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                      DATA/EXTERNAL LAYER                         │
│  ┌──────────────────┬──────────────────┬────────────────────┐   │
│  │ SQLite Database  │ Google Earth     │ GEE Tile Server    │   │
│  │ - Baselines      │ Engine API       │ - Map Tiles        │   │
│  │ - Cache          │ - Dynamic World  │ - XYZ Format       │   │
│  │ - Audit Trail    │ - Compute        │                    │   │
│  └──────────────────┴──────────────────┴────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Data Flow

```
User Draws Polygon → Frontend → POST /api/lulc/analyze
                                      ↓
                              FastAPI validates request
                                      ↓
                              Check cache (SQLite)
                                      ↓
                              GEE Service generates LULC
                                      ↓
                              Google Earth Engine API
                                      ↓
                              Returns tile URL + stats
                                      ↓
                              Cache result (SQLite)
                                      ↓
                              Return to Frontend
                                      ↓
                              Leaflet displays tiles
```

## 2. Component Design

### 2.1 Frontend Architecture

```
src/
├── App.jsx                    # Main application container
├── App.css                    # Global styles
├── components/
│   ├── Navbar.jsx            # Top navigation bar
│   ├── MetricCard.jsx        # Reusable metric display
│   ├── Map.jsx               # Leaflet map with drawing
│   ├── AnalyticsDashboard.jsx # Charts & visualizations
│   ├── StatsPanel.jsx        # LULC statistics table
│   ├── BaselinePanel.jsx     # Baseline management
│   ├── ChangeDetectionPanel.jsx # Change results
│   ├── RiskAssessmentPanel.jsx  # Risk display
│   ├── LeakagePanel.jsx      # Leakage analysis
│   └── DACBPanel.jsx         # DACB results
└── services/
    └── api.js                # API client functions
```

#### Component Hierarchy

```
App
├── Navbar
├── Map
│   └── Leaflet + Leaflet.Draw
└── Analytics Panel
    ├── MetricCard (×3)
    ├── Controls Section
    └── Results Tabs
        ├── AnalyticsDashboard (6 charts)
        ├── StatsPanel
        ├── ChangeDetectionPanel
        ├── RiskAssessmentPanel
        ├── LeakagePanel
        └── DACBPanel
```

### 2.2 Backend Architecture

```
backend/
├── app/
│   ├── main.py               # FastAPI app & routes
│   ├── schemas.py            # Pydantic models
│   ├── gee_service.py        # GEE integration
│   ├── database.py           # SQLite operations
│   ├── change_detection.py  # Change analysis
│   ├── risk_assessment.py   # Risk calculation
│   ├── leakage_analysis.py  # Leakage detection
│   ├── dacb_service.py       # DACB methodology
│   └── knn_service.py        # KNN control selection
├── requirements.txt
├── .env                      # Configuration
└── gee-key.json             # GEE credentials
```

#### Service Layer Design

```
┌─────────────────────────────────────────────────────────────┐
│                      GEE Service                             │
│  - init_gee()           : Initialize GEE with credentials   │
│  - geojson_to_ee()      : Convert GeoJSON to EE Geometry    │
│  - generate_lulc()      : Generate LULC map & statistics    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   Change Detection Service                   │
│  - calculate_changes()  : Compare baseline vs current       │
│  - detect_key_transitions() : Find LULC transitions         │
│  - generate_change_summary() : Executive summary            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      DACB Service                            │
│  - dacb_analysis()      : Main DACB workflow                │
│  - generate_buffer()    : Create control area buffer        │
│  - extract_forest_area(): Get forest stats                  │
│  - calculate_control_trend() : Control area trend           │
│  - generate_dynamic_baseline() : Calculate baseline         │
│  - calculate_avoided_deforestation() : Credits              │
│  - apply_leakage_adjustment() : Discount factors            │
│  - calculate_permanence_score() : Permanence metric         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      KNN Service                             │
│  - generate_candidate_tiles() : Create 25 tiles (2km×2km)   │
│  - extract_features_batch() : Extract 4 features per tile   │
│  - select_control_areas_knn() : KNN selection (K=5)         │
└─────────────────────────────────────────────────────────────┘
```

## 3. Database Design

### 3.1 Schema

```sql
-- Cache table for LULC results
CREATE TABLE cache (
    aoi_hash TEXT PRIMARY KEY,
    tile_url TEXT NOT NULL,
    stats TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Request audit trail
CREATE TABLE requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aoi TEXT NOT NULL,
    tile_url TEXT,
    stats TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Baseline snapshots
CREATE TABLE baselines (
    baseline_id TEXT PRIMARY KEY,
    aoi TEXT NOT NULL,
    baseline_year INTEGER NOT NULL,
    stats TEXT NOT NULL,
    tile_url TEXT NOT NULL,
    area_km2 REAL NOT NULL,
    locked BOOLEAN DEFAULT 0,
    locked_by TEXT,
    locked_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3.2 Data Models (Pydantic)

```python
# Request Models
class AOIRequest(BaseModel):
    aoi: dict                    # GeoJSON
    start_date: str              # YYYY-MM-DD
    end_date: str                # YYYY-MM-DD

class BaselineRequest(BaseModel):
    aoi: dict
    baseline_year: int           # 2018-2021

class ChangeDetectionRequest(BaseModel):
    baseline_id: str
    current_year: int            # 2020-2023
    aoi: dict

class DACBRequest(BaseModel):
    aoi: dict
    baseline_year: int
    current_year: int
    buffer_km: int = 5
    use_knn: bool = False

# Response Models
class LULCResponse(BaseModel):
    tile_url: str
    stats: dict                  # {class_id: pixel_count}
    aoi_area_km2: float

class ChangeDetectionResponse(BaseModel):
    baseline_year: int
    current_year: int
    years_elapsed: int
    changes: dict                # Per-class changes
    transitions: dict            # Key transitions
    summary: dict                # Executive summary
    current_tile_url: str

class DACBResponse(BaseModel):
    baseline_year: int
    current_year: int
    project_area_km2: float
    control_area_km2: float
    baseline_forest_km2: float
    current_forest_km2: float
    control_trend_pct: float
    dynamic_baseline_km2: float
    avoided_deforestation_km2: float
    carbon_credits_tco2e: float
    leakage_severity: str
    leakage_adjustment_factor: float
    adjusted_credits_tco2e: float
    permanence_score: float
    control_quality: str
```

## 4. API Design

### 4.1 Endpoint Specifications

#### POST /api/lulc/analyze
**Purpose**: Analyze LULC for single year  
**Input**: AOI (GeoJSON), start_date, end_date  
**Output**: tile_url, stats, area_km2  
**Processing Time**: 10-30s  
**Caching**: Yes

#### POST /api/lulc/timeline
**Purpose**: Multi-year LULC analysis  
**Input**: AOI, start_year, end_year  
**Output**: Array of yearly results  
**Processing Time**: 30s-2min  
**Caching**: Per year

#### POST /api/baseline/create
**Purpose**: Create baseline snapshot  
**Input**: AOI, baseline_year  
**Output**: baseline_id, stats, tile_url  
**Processing Time**: 10-30s  
**Persistence**: SQLite

#### POST /api/change-detection
**Purpose**: Detect LULC changes  
**Input**: baseline_id, current_year, AOI  
**Output**: changes, transitions, summary  
**Processing Time**: 15-40s  
**Dependencies**: Baseline must exist

#### POST /api/dacb/analyze
**Purpose**: DACB carbon credit analysis  
**Input**: AOI, baseline_year, current_year, buffer_km, use_knn  
**Output**: Credits, leakage, permanence  
**Processing Time**: 10-30s (buffer), 1-2min (KNN)  
**Method**: Buffer (default) or KNN

### 4.2 Error Handling

```python
# HTTP Status Codes
200 OK                  # Success
400 Bad Request         # Invalid input, AOI too large
404 Not Found           # Baseline not found
500 Internal Error      # GEE failure, processing error

# Error Response Format
{
    "detail": "Error message"
}
```

## 5. Algorithm Design

### 5.1 LULC Generation Algorithm

```python
def generate_lulc(aoi_geojson, start_date, end_date):
    """
    1. Convert GeoJSON to EE Geometry
    2. Load Dynamic World ImageCollection
    3. Filter by bounds and date range
    4. Calculate mode (most common class per pixel)
    5. Clip to AOI
    6. Generate map tile URL
    7. Calculate pixel histogram (statistics)
    8. Return tile_url, stats, area_km2
    """
```

### 5.2 Change Detection Algorithm

```python
def calculate_changes(baseline_stats, current_stats, area_km2):
    """
    For each of 9 LULC classes:
    1. Get baseline pixel count
    2. Get current pixel count
    3. Calculate pixel change = current - baseline
    4. Convert to area: area_km2 = pixels × 100 / 1,000,000
    5. Calculate percentage change
    6. Generate human-readable summary
    7. Return changes dict
    """
```

### 5.3 DACB Algorithm

```python
def dacb_analysis(aoi, baseline_year, current_year, buffer_km, use_knn):
    """
    1. Generate control area:
       - If use_knn=False: Simple buffer (10km)
       - If use_knn=True: KNN selection (K=5)
    
    2. Extract forest area for project & control:
       - Baseline year (trees class = 1)
       - Current year (trees class = 1)
    
    3. Calculate control trend:
       - control_trend = (control_current - control_baseline) / control_baseline
    
    4. Generate dynamic baseline:
       - dynamic_baseline = project_baseline × (1 + control_trend)
    
    5. Calculate avoided deforestation:
       - avoided = dynamic_baseline - project_current
       - If avoided < 0: No credits (reforestation)
    
    6. Convert to carbon credits:
       - tCO2e = avoided_km2 × 1,000,000 × biomass_factor × carbon_factor
       - biomass_factor = 150 tDM/ha (tropical forest)
       - carbon_factor = 0.47 (carbon content)
    
    7. Apply leakage adjustment:
       - Calculate leakage ratio = buffer_loss / project_gain
       - If ratio < 0.8: discount = 1.00 (LOW)
       - If ratio 0.8-1.5: discount = 0.75 (MEDIUM)
       - If ratio > 1.5: discount = 0.50 (HIGH)
       - adjusted_credits = credits × discount
    
    8. Calculate permanence score:
       - FSI = forest_stability_index
       - L_norm = normalized_leakage_ratio
       - permanence = 100 × FSI × (1 - L_norm)
    
    9. Assess control quality:
       - Check similarity, size, spatial distribution
       - Return EXCELLENT/GOOD/FAIR/POOR
    
    10. Return comprehensive DACB report
    """
```

### 5.4 KNN Control Selection Algorithm

```python
def select_control_areas_knn(aoi, baseline_year, current_year, k=5):
    """
    1. Generate 25 candidate tiles (2km × 2km) in 10km buffer
    
    2. Extract 4 features per tile:
       - forest_pct_baseline: Forest % at baseline year
       - forest_loss_rate: (baseline - current) / years
       - built_growth_rate: Built-up growth rate
       - volatility: abs(current - baseline)
    
    3. Create feature matrix (25 × 4)
    
    4. Extract same features for project area
    
    5. Fit KNN model (K=5, Euclidean distance)
    
    6. Find 5 nearest neighbors
    
    7. Calculate similarity scores: 1 / (1 + distance)
    
    8. Merge selected tiles into control area
    
    9. Return control geometry + metadata
    """
```

## 6. UI/UX Design

### 6.1 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  Navbar: Logo | Dashboard | Analytics | Reports | User     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────┬──────────────────────────────┐   │
│  │                      │  Metrics (3 cards)           │   │
│  │                      ├──────────────────────────────┤   │
│  │                      │  Controls                    │   │
│  │   Map (60%)          │  - Baseline Year             │   │
│  │   - Leaflet          │  - Compare Year              │   │
│  │   - Draw Tool        │  - Buttons                   │   │
│  │   - LULC Overlay     ├──────────────────────────────┤   │
│  │   - Buffer Overlay   │  Results Tabs (6)            │   │
│  │                      │  - Analytics (default)       │   │
│  │                      │  - Stats                     │   │
│  │                      │  - Changes                   │   │
│  │                      │  - Risk                      │   │
│  │                      │  - Leakage                   │   │
│  │                      │  - DACB                      │   │
│  └──────────────────────┴──────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Color Scheme

```css
/* Primary Colors */
--primary-lime: #84cc16      /* Lime green accent */
--primary-dark: #1a1a1a      /* Dark backgrounds */
--primary-white: #ffffff     /* Clean white */

/* LULC Class Colors */
--water: #419BDF             /* Blue */
--trees: #397D49             /* Dark green */
--grass: #88B053             /* Light green */
--flooded: #7A87C6           /* Purple-blue */
--crops: #E49635             /* Orange */
--shrub: #DFC35A             /* Yellow */
--built: #C4281B             /* Red */
--bare: #A59B8F              /* Brown */
--snow: #B39FE1              /* Light purple */

/* UI States */
--success: #10b981           /* Green */
--warning: #f59e0b           /* Orange */
--error: #ef4444             /* Red */
--info: #3b82f6              /* Blue */
```

### 6.3 Component Styles

**MetricCard**: Glassmorphism effect, hover animation  
**Buttons**: Lime green primary, smooth transitions  
**Tabs**: Active state with lime underline  
**Charts**: Professional B2B style (Recharts)  
**Map**: Full-height, responsive controls

## 7. Performance Optimization

### 7.1 Backend Optimizations

1. **Caching Strategy**
   - Cache LULC results by AOI hash
   - Reduce redundant GEE API calls
   - SQLite for fast local access

2. **KNN Optimization**
   - Reduced tiles: 100 → 25
   - Increased tile size: 1km → 2km
   - Reduced buffer: 20km → 10km
   - Lower resolution: 100m → 200m scale
   - Fewer neighbors: 8 → 5

3. **Batch Processing**
   - Extract features for all tiles in one GEE call
   - Reduce API round trips

4. **Default to Buffer Method**
   - use_knn=False by default
   - 10-30s vs 1-2min response time

### 7.2 Frontend Optimizations

1. **Lazy Loading**
   - Load charts only when tab is active
   - Defer non-critical components

2. **Memoization**
   - React.memo for expensive components
   - useMemo for calculations

3. **Debouncing**
   - Debounce map interactions
   - Throttle API calls

4. **Code Splitting**
   - Vite automatic code splitting
   - Dynamic imports for large libraries

## 8. Security Design

### 8.1 Authentication & Authorization
- **Phase 1**: No authentication (single-user)
- **Phase 2**: JWT-based authentication
- **Phase 3**: Role-based access control (RBAC)

### 8.2 Data Security
- GEE credentials stored server-side only
- Environment variables for sensitive config
- No credentials in frontend code
- CORS whitelist for allowed origins

### 8.3 Input Validation
- Pydantic models for request validation
- AOI size limits (max 10,000 km²)
- Date range validation
- GeoJSON structure validation

### 8.4 API Security
- Rate limiting (future)
- Request logging for audit
- Error messages without sensitive info
- HTTPS in production

## 9. Deployment Architecture

### 9.1 Development Environment

```
Frontend: http://localhost:5173 (Vite dev server)
Backend:  http://localhost:8000 (Uvicorn)
Database: ./backend/sylithe.db (SQLite)
```

### 9.2 Production Architecture (Future)

```
┌─────────────────────────────────────────────────────────┐
│  CDN (Cloudflare)                                       │
│  - Static assets (React build)                          │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  Load Balancer (AWS ALB / Nginx)                        │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  Application Servers (FastAPI)                          │
│  - Docker containers                                    │
│  - Auto-scaling group                                   │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  Database (PostgreSQL / RDS)                            │
│  - Managed service                                      │
│  - Automated backups                                    │
└─────────────────────────────────────────────────────────┘
```

## 10. Testing Strategy

### 10.1 Unit Tests
- GEE service functions
- DACB calculations
- Change detection logic
- KNN feature extraction

### 10.2 Integration Tests
- API endpoint tests
- Database operations
- GEE API integration
- End-to-end workflows

### 10.3 Performance Tests
- Load testing (concurrent users)
- Response time benchmarks
- Memory usage profiling
- GEE quota monitoring

### 10.4 UI Tests
- Component rendering
- User interactions
- Map functionality
- Chart visualizations

## 11. Monitoring & Logging

### 11.1 Application Logging
- Request/response logging
- Error tracking
- Performance metrics
- GEE API usage

### 11.2 Metrics to Track
- API response times
- GEE API calls per day
- Cache hit rate
- Error rates
- User activity

### 11.3 Alerting (Future)
- API downtime alerts
- Error rate thresholds
- GEE quota warnings
- Performance degradation

## 12. Documentation

### 12.1 Code Documentation
- Docstrings for all functions
- Type hints in Python
- JSDoc comments in React
- README files per module

### 12.2 API Documentation
- FastAPI auto-generated docs (Swagger)
- Available at /docs endpoint
- Request/response examples
- Error code reference

### 12.3 User Documentation
- User guide (future)
- Video tutorials (future)
- FAQ section (future)
- Methodology explanation

## 13. Version Control & CI/CD

### 13.1 Git Workflow
- Main branch: production-ready
- Develop branch: integration
- Feature branches: new features
- Semantic versioning (v1.0.0)

### 13.2 CI/CD Pipeline (Future)
```
Git Push → GitHub Actions
         ↓
    Run Tests
         ↓
    Build Docker Image
         ↓
    Deploy to Staging
         ↓
    Manual Approval
         ↓
    Deploy to Production
```

## 14. Scalability Considerations

### 14.1 Horizontal Scaling
- Stateless API design
- Load balancer distribution
- Multiple FastAPI instances
- Shared database

### 14.2 Database Scaling
- SQLite → PostgreSQL migration
- Read replicas for queries
- Connection pooling
- Query optimization

### 14.3 Caching Layer
- Redis for distributed cache
- Cache invalidation strategy
- TTL policies

### 14.4 GEE Optimization
- Batch requests where possible
- Efficient geometry operations
- Minimize data transfer
- Use appropriate scales

## 15. Future Enhancements

### 15.1 Technical Improvements
- WebSocket for real-time updates
- GraphQL API option
- Microservices architecture
- Kubernetes orchestration
- Multi-region deployment

### 15.2 Feature Additions
- Machine learning predictions
- Custom methodology builder
- Advanced reporting engine
- Mobile app (React Native)
- Offline mode support

### 15.3 Integration Opportunities
- Carbon registry APIs
- Satellite imagery providers
- GIS software (QGIS, ArcGIS)
- Project management tools
- Blockchain for verification
