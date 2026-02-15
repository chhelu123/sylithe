# Sylithe - Requirements Specification

## 1. Project Overview

**Product Name**: Sylithe  
**Type**: Enterprise Carbon Intelligence Platform  
**Target Users**: Carbon credit developers, ESG compliance teams, environmental consultants  
**Purpose**: LULC analysis and carbon credit monitoring using DACB methodology

## 2. Functional Requirements

### 2.1 Core Features

#### FR-1: Land Use/Land Cover (LULC) Analysis
- **FR-1.1**: Analyze LULC for any polygon AOI (Area of Interest)
- **FR-1.2**: Support date range selection (2018-2023)
- **FR-1.3**: Use Google Dynamic World dataset (10m resolution)
- **FR-1.4**: Display 9 land cover classes:
  - Water (0)
  - Trees/Forest (1)
  - Grass (2)
  - Flooded Vegetation (3)
  - Crops (4)
  - Shrub & Scrub (5)
  - Built Area (6)
  - Bare Ground (7)
  - Snow & Ice (8)
- **FR-1.5**: Calculate area statistics per class (km²)
- **FR-1.6**: Generate tile URLs for map visualization
- **FR-1.7**: Maximum AOI size: 10,000 km²

#### FR-2: Timeline Analysis
- **FR-2.1**: Multi-year LULC comparison (2018-2023)
- **FR-2.2**: Year-by-year statistics
- **FR-2.3**: Temporal trend visualization
- **FR-2.4**: Annual forest cover tracking

#### FR-3: Baseline Management
- **FR-3.1**: Create baseline snapshot for specific year
- **FR-3.2**: Store baseline permanently in database
- **FR-3.3**: Lock baseline to prevent modifications
- **FR-3.4**: Generate unique baseline ID (SHA-256 hash)
- **FR-3.5**: Audit trail with timestamps
- **FR-3.6**: Track baseline creator/locker identity

#### FR-4: Change Detection
- **FR-4.1**: Compare baseline vs current year LULC
- **FR-4.2**: Calculate absolute change (km²) per class
- **FR-4.3**: Calculate percentage change per class
- **FR-4.4**: Detect key transitions:
  - Forest → Urban
  - Forest → Bare Ground
  - Cropland → Forest
  - Grass → Urban
  - Water Loss
- **FR-4.5**: Generate executive summary of significant changes (>5%)
- **FR-4.6**: Visualize changes on map

#### FR-5: Risk Assessment
- **FR-5.1**: Calculate forest loss rate (%/year)
- **FR-5.2**: Assess deforestation risk (LOW/MEDIUM/HIGH/CRITICAL)
- **FR-5.3**: Calculate urban encroachment rate
- **FR-5.4**: Measure land use volatility
- **FR-5.5**: Generate risk score (0-100)
- **FR-5.6**: Provide risk mitigation recommendations

#### FR-6: Leakage Analysis
- **FR-6.1**: Generate buffer zone (5km default, configurable)
- **FR-6.2**: Compare forest loss inside vs outside project area
- **FR-6.3**: Calculate leakage ratio
- **FR-6.4**: Classify leakage severity (LOW/MEDIUM/HIGH)
- **FR-6.5**: Visualize buffer zone on map
- **FR-6.6**: Provide leakage mitigation strategies

#### FR-7: DACB (Dynamic Area Control Baseline) Analysis
- **FR-7.1**: Generate control area using buffer method (default)
- **FR-7.2**: Optional KNN-based control area selection
- **FR-7.3**: Extract forest trends from control area
- **FR-7.4**: Calculate dynamic baseline using control trend
- **FR-7.5**: Compute avoided deforestation (tCO2e)
- **FR-7.6**: Apply leakage adjustment (discount factors)
- **FR-7.7**: Calculate permanence score (0-100)
- **FR-7.8**: Assess control area quality
- **FR-7.9**: Generate audit-ready report

#### FR-8: Interactive Mapping
- **FR-8.1**: Leaflet-based map interface
- **FR-8.2**: Draw polygon tool for AOI selection
- **FR-8.3**: Satellite/street view toggle
- **FR-8.4**: Geolocation support
- **FR-8.5**: Display LULC tiles as overlay
- **FR-8.6**: Display buffer zone overlay
- **FR-8.7**: Zoom/pan controls
- **FR-8.8**: Layer management

#### FR-9: Analytics Dashboard
- **FR-9.1**: Real-time metric cards (Forest Area, Risk Level, Status)
- **FR-9.2**: 6 chart visualizations:
  - Forest Cover Timeline (area chart)
  - Land Use Distribution (donut chart)
  - Carbon Credit Flow (waterfall chart)
  - Risk Assessment (radial gauge)
  - Leakage Analysis (bar chart)
  - KPI Summary Cards
- **FR-9.3**: Tabbed results interface
- **FR-9.4**: Export capabilities (future)

### 2.2 KNN Control Area Selection

#### FR-10: KNN Features
- **FR-10.1**: Generate 25 candidate tiles (2km × 2km)
- **FR-10.2**: 10km buffer zone for candidates
- **FR-10.3**: Extract 4 features per tile:
  - Forest percentage at baseline
  - Forest loss rate (%/year)
  - Built-up growth rate (%/year)
  - Volatility (absolute change)
- **FR-10.4**: Use Euclidean distance metric
- **FR-10.5**: Select K=5 most similar tiles
- **FR-10.6**: Merge selected tiles into control area
- **FR-10.7**: Calculate similarity scores
- **FR-10.8**: Disabled by default (use_knn=False)

### 2.3 Data Management

#### FR-11: Caching
- **FR-11.1**: Cache LULC results by AOI hash
- **FR-11.2**: Cache tile URLs
- **FR-11.3**: Cache statistics
- **FR-11.4**: Reduce redundant GEE API calls

#### FR-12: Database
- **FR-12.1**: SQLite database for persistence
- **FR-12.2**: Tables: cache, requests, baselines
- **FR-12.3**: Store baselines with lock status
- **FR-12.4**: Audit trail for all operations
- **FR-12.5**: Automatic schema initialization

### 2.4 API Requirements

#### FR-13: REST API Endpoints
- **FR-13.1**: `GET /api/health` - Health check
- **FR-13.2**: `POST /api/lulc/analyze` - Single year analysis
- **FR-13.3**: `POST /api/lulc/timeline` - Multi-year analysis
- **FR-13.4**: `POST /api/baseline/create` - Create baseline
- **FR-13.5**: `POST /api/baseline/lock` - Lock baseline
- **FR-13.6**: `GET /api/baseline/{id}` - Get baseline
- **FR-13.7**: `POST /api/change-detection` - Detect changes
- **FR-13.8**: `POST /api/risk-assessment` - Assess risk
- **FR-13.9**: `POST /api/leakage-analysis` - Analyze leakage
- **FR-13.10**: `POST /api/dacb/analyze` - DACB analysis

## 3. Non-Functional Requirements

### 3.1 Performance
- **NFR-1**: LULC analysis response time: <30 seconds
- **NFR-2**: Buffer method DACB: 10-30 seconds
- **NFR-3**: KNN method DACB: 1-2 minutes
- **NFR-4**: Map tile loading: <3 seconds
- **NFR-5**: Support AOI up to 10,000 km²
- **NFR-6**: Concurrent users: 10+ (scalable)

### 3.2 Reliability
- **NFR-7**: API uptime: 99.5%
- **NFR-8**: Graceful error handling
- **NFR-9**: Automatic retry for GEE failures
- **NFR-10**: Data persistence in SQLite

### 3.3 Security
- **NFR-11**: GEE credentials stored server-side only
- **NFR-12**: CORS protection
- **NFR-13**: No credentials exposed to frontend
- **NFR-14**: Input validation for all API requests
- **NFR-15**: AOI size validation

### 3.4 Usability
- **NFR-16**: Clean, professional UI (Stripe/Vercel style)
- **NFR-17**: Responsive design (desktop-first)
- **NFR-18**: Intuitive polygon drawing
- **NFR-19**: Clear error messages
- **NFR-20**: Loading indicators for all operations

### 3.5 Scalability
- **NFR-21**: Horizontal scaling support (FastAPI)
- **NFR-22**: Stateless API design
- **NFR-23**: Database migration path (SQLite → PostgreSQL)
- **NFR-24**: Caching layer for performance

### 3.6 Maintainability
- **NFR-25**: Modular code architecture
- **NFR-26**: Type hints in Python
- **NFR-27**: PropTypes in React (optional)
- **NFR-28**: Comprehensive error logging
- **NFR-29**: Code documentation

### 3.7 Compatibility
- **NFR-30**: Python 3.8+
- **NFR-31**: Node.js 16+
- **NFR-32**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **NFR-33**: Google Earth Engine API compatibility

## 4. Technical Requirements

### 4.1 Backend Stack
- **TR-1**: Python 3.8+
- **TR-2**: FastAPI framework
- **TR-3**: Google Earth Engine API
- **TR-4**: SQLite database
- **TR-5**: scikit-learn 1.4.0 (KNN)
- **TR-6**: numpy 1.26.3
- **TR-7**: python-dotenv for configuration

### 4.2 Frontend Stack
- **TR-8**: React 18
- **TR-9**: Vite build tool
- **TR-10**: Leaflet 1.9+ for maps
- **TR-11**: Leaflet Draw for polygon tool
- **TR-12**: Recharts 2.10+ for visualizations
- **TR-13**: Modern CSS (Flexbox, Grid)

### 4.3 External Services
- **TR-14**: Google Earth Engine service account
- **TR-15**: Dynamic World dataset (GOOGLE/DYNAMICWORLD/V1)
- **TR-16**: GEE tile server for map rendering

### 4.4 Development Environment
- **TR-17**: Git version control
- **TR-18**: .env file for configuration
- **TR-19**: Hot reload for development
- **TR-20**: CORS enabled for localhost

## 5. Data Requirements

### 5.1 Input Data
- **DR-1**: GeoJSON polygon (AOI)
- **DR-2**: Date range (YYYY-MM-DD format)
- **DR-3**: Baseline year (2018-2021)
- **DR-4**: Current year (2020-2023)
- **DR-5**: Buffer distance (km)
- **DR-6**: K value for KNN (default: 5)

### 5.2 Output Data
- **DR-7**: Tile URLs (XYZ format)
- **DR-8**: LULC statistics (pixel counts per class)
- **DR-9**: Area measurements (km²)
- **DR-10**: Change metrics (absolute & percentage)
- **DR-11**: Risk scores and levels
- **DR-12**: Leakage ratios and severity
- **DR-13**: Carbon credit estimates (tCO2e)
- **DR-14**: Audit reports (JSON)

### 5.3 Data Quality
- **DR-15**: 10m spatial resolution (Dynamic World)
- **DR-16**: Daily temporal resolution (2018-2023)
- **DR-17**: 9 land cover classes
- **DR-18**: Global coverage (Dynamic World)

## 6. Compliance & Standards

### 6.1 Carbon Credit Standards
- **CS-1**: DACB methodology compliance
- **CS-2**: Baseline & version control
- **CS-3**: Leakage monitoring
- **CS-4**: Permanence assessment
- **CS-5**: Audit trail requirements

### 6.2 ESG Reporting
- **CS-6**: Land use change tracking
- **CS-7**: Deforestation monitoring
- **CS-8**: Carbon risk assessment
- **CS-9**: Transparency & traceability

## 7. Future Enhancements

### 7.1 Phase 2 Features
- **FE-1**: Multi-user authentication
- **FE-2**: Project management dashboard
- **FE-3**: PDF report generation
- **FE-4**: Email notifications
- **FE-5**: Webhook integrations
- **FE-6**: Advanced analytics (ML predictions)
- **FE-7**: Canopy Height Model integration
- **FE-8**: Biomass estimation
- **FE-9**: Carbon stock calculations
- **FE-10**: API rate limiting

### 7.2 Phase 3 Features
- **FE-11**: Mobile app (React Native)
- **FE-12**: Real-time alerts
- **FE-13**: Satellite imagery comparison
- **FE-14**: Custom methodology support
- **FE-15**: Multi-language support
- **FE-16**: White-label deployment
- **FE-17**: Enterprise SSO
- **FE-18**: Advanced permissions
- **FE-19**: Data export (CSV, GeoJSON, Shapefile)
- **FE-20**: Integration with carbon registries

## 8. Constraints & Assumptions

### 8.1 Constraints
- **C-1**: Google Earth Engine API rate limits
- **C-2**: Maximum AOI size: 10,000 km²
- **C-3**: Data availability: 2018-2023 only
- **C-4**: Internet connection required
- **C-5**: GEE service account required

### 8.2 Assumptions
- **A-1**: Users have basic GIS knowledge
- **A-2**: Desktop browser usage (primary)
- **A-3**: English language only (Phase 1)
- **A-4**: Single-user mode (Phase 1)
- **A-5**: Static canopy height acceptable for baseline

## 9. Success Criteria

### 9.1 Technical Success
- **SC-1**: All API endpoints functional
- **SC-2**: <30s response time for standard analysis
- **SC-3**: Zero data loss
- **SC-4**: 99%+ uptime

### 9.2 Business Success
- **SC-5**: Accurate LULC classification (>85%)
- **SC-6**: Audit-ready DACB reports
- **SC-7**: User-friendly interface
- **SC-8**: Positive user feedback
- **SC-9**: Competitive analysis speed

## 10. Glossary

- **AOI**: Area of Interest (project boundary)
- **LULC**: Land Use/Land Cover
- **DACB**: Dynamic Area Control Baseline
- **GEE**: Google Earth Engine
- **KNN**: K-Nearest Neighbors
- **ESG**: Environmental, Social, Governance
- **tCO2e**: Tonnes of CO2 equivalent
- **CHM**: Canopy Height Model
- **DSM**: Digital Surface Model
- **DTM**: Digital Terrain Model
