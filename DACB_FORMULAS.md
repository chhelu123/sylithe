# Dynamic Area Control Baseline (DACB)
## Exact Formulas + Leakage Integration + Implementation Guide

**Audience:** System Design & Implementation  
**Context:** High-Integrity Carbon Credit MRV Systems

---

## 1. DEFINITIONS (STRICT, UNAMBIGUOUS)

### Notation

Let:
- **Aₚ** = Project Area (AOI)
- **Aᶜ** = Control Area (buffer / matched region)
- **t** = year index
- **t₀** = baseline start year
- **tₙ** = current monitoring year

### From LULC (Dynamic World)

- **Fₚ(t)** = forest area in project area at year t (km²)
- **Fᶜ(t)** = forest area in control area at year t (km²)

**Note:** All areas computed using pixelArea-based aggregation, not pixel counts.

---

## 2. CORE DACB FORMULAS

### 2.1 Control Area Trend (Counterfactual Driver)

Compute annual forest loss rate in control area:

**Linear form (simple, audit-friendly):**

```
rᶜ = (Fᶜ(t₀) - Fᶜ(tₙ)) / (tₙ - t₀)
```

Where:
- **rᶜ** = expected forest loss per year (km²/year)

---

### 2.2 Dynamic Baseline for Project Area

The expected forest area in project area **without the project**:

```
F̂ₚ(t) = Fₚ(t₀) - rᶜ · (t - t₀)
```

**This is the Dynamic Area Control Baseline curve.**

---

### 2.3 Observed Project Outcome

From LULC:

```
Fₚᵒᵇˢ(t) = Observed forest area in project at year t
```

---

### 2.4 Avoided Deforestation (Core Credit Signal)

```
AD(t) = F̂ₚ(t) - Fₚᵒᵇˢ(t)
```

**Interpretation:**
- **AD(t) > 0** → positive avoided loss
- **AD(t) ≤ 0** → no creditable benefit

This value feeds carbon credit calculations (after biomass & carbon factors).

---

## 3. INTEGRATING DACB WITH LEAKAGE MODULE

**This is the critical integration step.**

### 3.1 Leakage Rate (From Existing Module)

From leakage analysis:

```
L = (Fᶜ(t₀) - Fᶜ(tₙ)) / (Fₚ(t₀) - Fₚ(tₙ) + ε)
```

Where:
- **ε** is a small stabilizer (e.g., 0.1 km²)

**Leakage severity thresholds:**

| Severity | Range |
|----------|-------|
| LOW | L < 0.8 |
| MEDIUM | 0.8 ≤ L ≤ 1.5 |
| HIGH | L > 1.5 |

---

### 3.2 Leakage-Adjusted Baseline (CRITICAL)

Apply leakage discount factor **λ**:

| Leakage Severity | λ |
|------------------|---|
| NONE / LOW | 1.00 |
| MEDIUM | 0.75 |
| HIGH | 0.50 |

**Adjusted avoided deforestation:**

```
ADₐdⱼ(t) = AD(t) · λ
```

**This prevents over-crediting and aligns with conservative registry logic.**

---

## 4. PERMANENCE & REVERSAL ADJUSTMENT

### 4.1 Forest Stability Index (FSI)

```
FSI = 1 - (Σ|Fₚ(tᵢ) - Fₚ(tᵢ₋₁)|) / Fₚ(t₀)
```

**Range:** 0 ≤ FSI ≤ 1

**Interpretation:**
- High FSI → stable forest
- Low FSI → volatile land use

---

### 4.2 Permanence Confidence Score (PCS)

```
PCS = 100 × FSI × (1 - Lₙₒᵣₘ)
```

Where:
```
Lₙₒᵣₘ = min(L/2, 1)
```

**This produces a 0–100 permanence score:**

| Score | Confidence |
|-------|------------|
| 80+ | High confidence |
| 50-80 | Medium |
| <50 | High risk |

---

## 5. FULL DACB + LEAKAGE PIPELINE

```
┌─────────────────────────────────────┐
│   LULC (Dynamic World)              │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Forest Area Time Series (PA & CA) │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Control Area Trend (rᶜ)           │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Dynamic Baseline Curve            │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Observed vs Expected Comparison   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Avoided Deforestation (AD)        │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Leakage Adjustment (λ)            │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Permanence Adjustment (PCS)       │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Final Creditable Outcome          │
└─────────────────────────────────────┘
```

**All steps are:**
- ✅ Deterministic
- ✅ Reproducible
- ✅ Explainable

---

## 6. API-LEVEL IMPLEMENTATION

### Core Outputs per AOI

```json
{
  "baseline_model": "Dynamic Area Control Baseline",
  "control_trend_km2_per_year": 0.42,
  "expected_forest_km2": 123.4,
  "observed_forest_km2": 118.9,
  "avoided_deforestation_km2": 4.5,
  "leakage_ratio": 1.3,
  "leakage_adjustment_factor": 0.75,
  "adjusted_avoided_deforestation_km2": 3.4,
  "permanence_score": 72,
  "confidence": "MEDIUM"
}
```

---

## 7. HIGH-VALUE ENHANCEMENTS

### A. Control Area Quality Score

Score similarity between PA and CA:
- Initial forest %
- Elevation
- Distance to roads

**Low similarity → baseline uncertainty warning.**

---

### B. Baseline Uncertainty Band

Compute:
```
F̂ₚ(t) ± σ
```

Where **σ** = control trend variance.

**Auditors love uncertainty disclosure.**

---

### C. Dual-Control Validation (Advanced)

Use:
- Near buffer
- Far buffer

**Compare both trends → flag anomalies.**

---

### D. Plain-English Justification

**Example:**
> "The baseline is derived from surrounding land that lost forest at a steady rate of 0.42 km²/year, representing realistic pressure in absence of the project."

**LLMs explain, never compute.**

---

## 8. IMPLEMENTATION FORMULAS (CODE-READY)

### Step 1: Extract Forest Areas

```python
def get_forest_area(geometry, year):
    """Extract forest area from LULC for given year"""
    start = f"{year}-01-01"
    end = f"{year}-12-31"
    
    dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1') \
        .filterDate(start, end) \
        .filterBounds(geometry) \
        .select('label') \
        .mode()
    
    # Class 1 = Trees
    forest = dw.eq(1)
    
    # Use pixelArea for accurate km² calculation
    area_image = forest.multiply(ee.Image.pixelArea())
    
    stats = area_image.reduceRegion(
        reducer=ee.Reducer.sum(),
        geometry=geometry,
        scale=10,
        maxPixels=1e9
    )
    
    area_m2 = stats.getInfo().get('label', 0)
    area_km2 = area_m2 / 1e6
    
    return area_km2
```

---

### Step 2: Calculate Control Trend

```python
def calculate_control_trend(control_area, t0, tn):
    """Calculate annual forest loss rate in control area"""
    F_c_t0 = get_forest_area(control_area, t0)
    F_c_tn = get_forest_area(control_area, tn)
    
    r_c = (F_c_t0 - F_c_tn) / (tn - t0)
    
    return r_c
```

---

### Step 3: Generate Dynamic Baseline

```python
def dynamic_baseline(project_area, control_trend, t0, t):
    """Calculate expected forest area at year t"""
    F_p_t0 = get_forest_area(project_area, t0)
    F_hat_p_t = F_p_t0 - control_trend * (t - t0)
    
    return max(F_hat_p_t, 0)  # Cannot be negative
```

---

### Step 4: Calculate Avoided Deforestation

```python
def avoided_deforestation(project_area, baseline_forest, t):
    """Calculate avoided deforestation"""
    F_p_obs = get_forest_area(project_area, t)
    AD = baseline_forest - F_p_obs
    
    return max(AD, 0)  # Only positive values are creditable
```

---

### Step 5: Apply Leakage Adjustment

```python
def leakage_adjusted_credits(AD, leakage_ratio):
    """Apply leakage discount factor"""
    if leakage_ratio < 0.8:
        lambda_factor = 1.00  # LOW
    elif leakage_ratio <= 1.5:
        lambda_factor = 0.75  # MEDIUM
    else:
        lambda_factor = 0.50  # HIGH
    
    AD_adj = AD * lambda_factor
    
    return AD_adj, lambda_factor
```

---

### Step 6: Calculate Permanence Score

```python
def permanence_confidence_score(project_area, t0, tn, leakage_ratio):
    """Calculate permanence confidence (0-100)"""
    # Get time series
    years = range(t0, tn + 1)
    forest_areas = [get_forest_area(project_area, y) for y in years]
    
    # Calculate FSI
    F_p_t0 = forest_areas[0]
    volatility = sum(abs(forest_areas[i] - forest_areas[i-1]) 
                     for i in range(1, len(forest_areas)))
    FSI = 1 - (volatility / F_p_t0)
    FSI = max(0, min(FSI, 1))  # Clamp to [0,1]
    
    # Normalize leakage
    L_norm = min(leakage_ratio / 2, 1)
    
    # Calculate PCS
    PCS = 100 * FSI * (1 - L_norm)
    
    return round(PCS, 1)
```

---

## 9. KEY PRINCIPLES

### DACB is a mathematical counterfactual system, not a predictive ML model.

**AI may:**
- ✅ Smooth trends
- ✅ Estimate uncertainty
- ✅ Generate explanations

**AI must NOT:**
- ❌ Define baselines
- ❌ Override leakage penalties
- ❌ Decide credit eligibility

---

## 10. VALIDATION & QUALITY CHECKS

### A. Baseline Sanity Checks

```python
def validate_baseline(r_c, F_p_t0, years):
    """Validate baseline parameters"""
    checks = {
        "control_trend_reasonable": 0 <= r_c <= F_p_t0 * 0.1,  # Max 10% per year
        "baseline_positive": F_p_t0 - r_c * years > 0,
        "control_trend_not_zero": r_c > 0.001
    }
    return all(checks.values()), checks
```

---

### B. Control Area Quality

```python
def control_area_quality_score(project_area, control_area, t0):
    """Score similarity between PA and CA"""
    F_p = get_forest_area(project_area, t0)
    F_c = get_forest_area(control_area, t0)
    
    A_p = project_area.area().getInfo() / 1e6  # km²
    A_c = control_area.area().getInfo() / 1e6
    
    # Forest cover similarity
    forest_pct_p = (F_p / A_p) * 100
    forest_pct_c = (F_c / A_c) * 100
    
    similarity = 1 - abs(forest_pct_p - forest_pct_c) / 100
    
    quality = "HIGH" if similarity > 0.8 else "MEDIUM" if similarity > 0.6 else "LOW"
    
    return {
        "similarity_score": round(similarity, 2),
        "quality": quality,
        "project_forest_pct": round(forest_pct_p, 1),
        "control_forest_pct": round(forest_pct_c, 1)
    }
```

---

## 11. COMPLETE WORKFLOW EXAMPLE

```python
def dacb_full_analysis(project_aoi, control_aoi, t0, tn):
    """Complete DACB analysis with leakage integration"""
    
    # Step 1: Calculate control trend
    r_c = calculate_control_trend(control_aoi, t0, tn)
    
    # Step 2: Generate baseline
    F_hat_p_tn = dynamic_baseline(project_aoi, r_c, t0, tn)
    
    # Step 3: Get observed outcome
    F_p_obs_tn = get_forest_area(project_aoi, tn)
    
    # Step 4: Calculate avoided deforestation
    AD = avoided_deforestation(project_aoi, F_hat_p_tn, tn)
    
    # Step 5: Calculate leakage
    F_p_t0 = get_forest_area(project_aoi, t0)
    F_c_t0 = get_forest_area(control_aoi, t0)
    F_c_tn = get_forest_area(control_aoi, tn)
    
    leakage_ratio = (F_c_t0 - F_c_tn) / (F_p_t0 - F_p_obs_tn + 0.1)
    
    # Step 6: Apply leakage adjustment
    AD_adj, lambda_factor = leakage_adjusted_credits(AD, leakage_ratio)
    
    # Step 7: Calculate permanence
    PCS = permanence_confidence_score(project_aoi, t0, tn, leakage_ratio)
    
    # Step 8: Quality checks
    quality = control_area_quality_score(project_aoi, control_aoi, t0)
    
    return {
        "baseline_model": "Dynamic Area Control Baseline",
        "control_trend_km2_per_year": round(r_c, 3),
        "expected_forest_km2": round(F_hat_p_tn, 2),
        "observed_forest_km2": round(F_p_obs_tn, 2),
        "avoided_deforestation_km2": round(AD, 2),
        "leakage_ratio": round(leakage_ratio, 2),
        "leakage_adjustment_factor": lambda_factor,
        "adjusted_avoided_deforestation_km2": round(AD_adj, 2),
        "permanence_score": PCS,
        "control_area_quality": quality,
        "confidence": "HIGH" if PCS > 70 else "MEDIUM" if PCS > 50 else "LOW"
    }
```

---

## 12. ONE-LINE SUMMARY

> **DACB estimates expected land-use change using observed trends in control areas and adjusts credit outcomes using leakage and permanence penalties to ensure conservative, high-integrity carbon baselines.**

---

## 13. REFERENCES

1. Verra VCS Methodology VM0015 (Avoided Unplanned Deforestation)
2. Gold Standard Land Use & Forests Activity Requirements
3. IPCC Guidelines for National Greenhouse Gas Inventories
4. Google Earth Engine Dynamic World Dataset Documentation
5. Indian Carbon Market Framework (2023)

---

**Document Version:** 2.0 (Implementation-Ready)  
**Last Updated:** 2024  
**Status:** Production Formula Set
