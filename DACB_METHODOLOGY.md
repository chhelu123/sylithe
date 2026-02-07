# Dynamic Area Control Baseline (DACB) Methodology

**For:** Carbon Credits, LULC, MRV Systems  
**Context:** High-Integrity Carbon Market Compliance

---

## 1. What is a Dynamic Area Control Baseline (DACB)?

A **Dynamic Area Control Baseline (DACB)** is a baseline methodology framework used in land-based carbon projects where:

- The baseline land-use state is **not assumed to be static**
- It is **continuously updated** using observed land-use trends in surrounding control areas

### Simple Definition

Instead of saying:
> "This land would have remained the same forever"

DACB asks:
> "What would have realistically happened to this land if the project did NOT exist?"

This approach is **much closer to reality** and increasingly preferred in high-integrity carbon markets.

---

## 2. Why Static Baselines Are Weak

### Traditional Approach Problems

Traditional carbon projects use:
- A **fixed historical baseline** (e.g., 2015–2019 average)
- Assume land degradation or deforestation continues at the same rate

**Critical Issues:**
- ❌ Ignores regional development pressure
- ❌ Ignores policy changes
- ❌ Over-credits carbon
- ❌ High greenwashing risk

**DACB fixes this.**

---

## 3. Core Idea Behind DACB

**Project Area behavior** is compared against **dynamically observed behavior** in similar surrounding areas (controls).

These surrounding areas act as a **counterfactual**.

### Logic Flow

```
If nearby land is degrading → Project is credited for preventing that degradation
If nearby land is stable → Credits are reduced
```

---

## 4. Components of DACB (System Design View)

### 4.1 Project Area (PA)

- AOI defined by project boundary
- Where carbon activity occurs

### 4.2 Control Areas (CA)

Buffer zones or matched regions outside the project

**Must be:**
- ✅ Ecologically similar
- ✅ Socio-economically similar
- ✅ Not influenced by the project

**This is critical.**

---

## 5. How LULC Enables DACB

LULC data (Dynamic World) provides:

| DACB Requirement | LULC Role |
|------------------|-----------|
| Historical land use | Baseline state |
| Trend estimation | Year-to-year changes |
| Control comparison | PA vs CA |
| Leakage detection | Spatial shift analysis |
| Permanence tracking | Long-term stability |

---

## 6. Step-by-Step DACB Workflow (Implementation)

### Step 1: Define Project AOI

- User draws polygon
- AOI validated (size, location)

### Step 2: Generate Control Area(s)

**Multiple strategies:**
- Concentric buffer (e.g., 5–10 km)
- Matched land parcels (future enhancement)

**Control area excludes:**
- Urban zones
- Protected areas
- Water bodies (if irrelevant)

### Step 3: Compute Historical Trends

Using LULC:
- Forest cover %
- Vegetation stability
- Land conversion rate

**Computed for:**
- Project Area
- Control Area

### Step 4: Establish Dynamic Baseline

Baseline is **not a single value**, but a **trend model**:

**Example:**
> "Control area lost 2.3% forest per year between 2016–2021"

This becomes the **expected behavior** of the project land without intervention.

### Step 5: Compare Observed vs Expected

Each monitoring period:

```
Expected forest loss (from control)
− Observed forest loss (project)
= Avoided deforestation
```

This directly feeds **credit calculations**.

### Step 6: Continuous Update

Every year:
- Recompute control trends
- Adjust baseline
- Prevent over-crediting

**This is what makes it dynamic.**

---

## 7. DACB vs Leakage Detection (Important Distinction)

| Concept | Purpose |
|---------|---------|
| **Leakage detection** | Detect displacement |
| **DACB** | Estimate counterfactual baseline |

They are **related but not the same**.

- **DACB:** Feeds credit issuance logic
- **Leakage:** Feeds risk & integrity logic

**Your platform should support both.**

---

## 8. Why DACB Improves Carbon Integrity

DACB:
- ✅ Reduces inflated baselines
- ✅ Adapts to real-world changes
- ✅ Aligns with high-integrity standards
- ✅ Increases buyer trust

This is why advanced platforms (e.g., Pachama) move toward dynamic baselines.

---

## 9. How to Implement DACB in Sylithe

### Deterministic Core (Mandatory)

- LULC-based trend computation
- Control vs project comparison
- Transparent math

### Optional AI Layer

- Trend smoothing
- Uncertainty estimation
- Risk-weighted baseline adjustment

**⚠️ AI must not define the baseline directly.**

### Key Design Principle

> DACB is not a model — it is a framework.  
> The "dynamic" part comes from continuous observation, not machine learning.

---

## 10. Output Artifacts (What System Must Produce)

For each project:

1. Control area definition
2. Year-wise trends (PA vs CA)
3. Dynamic baseline curve
4. Avoided loss estimates
5. Plain-English explanation

These outputs are:
- ✅ Auditor-ready
- ✅ Buyer-readable
- ✅ Defensible

---

## 11. Implementation Roadmap

### Phase 1: Control Area Generation
- Automated buffer zone creation
- Exclusion of urban/protected areas
- Validation of ecological similarity

### Phase 2: Trend Analysis Engine
- Historical LULC trend computation
- PA vs CA comparison
- Statistical significance testing

### Phase 3: Dynamic Baseline Calculator
- Trend-based baseline projection
- Continuous baseline updates
- Credit calculation logic

### Phase 4: Reporting & Visualization
- Baseline curve visualization
- Counterfactual comparison charts
- Audit-ready reports

---

## 12. Technical Architecture

```
┌─────────────────────────────────────────────────────┐
│                  User Input (AOI)                   │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│          Control Area Generation Module             │
│  • Buffer zone creation (5-10km)                   │
│  • Exclusion filters (urban, water, protected)     │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│           LULC Trend Analysis Engine                │
│  • Historical data extraction (2016-present)       │
│  • Forest cover % calculation                      │
│  • Deforestation rate computation                  │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│         Dynamic Baseline Establishment              │
│  • Control area trend modeling                     │
│  • Expected behavior projection                    │
│  • Baseline curve generation                       │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│          Credit Calculation & Reporting             │
│  • Observed vs Expected comparison                 │
│  • Avoided deforestation quantification            │
│  • Audit-ready documentation                       │
└─────────────────────────────────────────────────────┘
```

---

## 13. Key Metrics & KPIs

### For Project Area (PA)
- Forest cover % (baseline year)
- Forest cover % (current year)
- Annual deforestation rate
- Land conversion events

### For Control Area (CA)
- Forest cover % (baseline year)
- Forest cover % (current year)
- Annual deforestation rate
- Regional development pressure

### Baseline Metrics
- Expected deforestation rate
- Observed deforestation rate
- Avoided deforestation (credits)
- Baseline adjustment factor

---

## 14. Compliance & Standards

DACB aligns with:
- ✅ Verra VCS (Verified Carbon Standard)
- ✅ Gold Standard
- ✅ Indian Carbon Market (ICM) requirements
- ✅ CORSIA (aviation carbon offsetting)

---

## 15. Final One-Line Summary

> **Dynamic Area Control Baseline uses surrounding land-use trends to continuously estimate what would have happened to a project area in the absence of intervention, enabling more realistic and defensible carbon credit baselines.**

---

## References & Further Reading

1. Verra VCS Methodology VM0015 (Avoided Unplanned Deforestation)
2. Gold Standard Land Use & Forests Activity Requirements
3. Indian Carbon Market Framework (2023)
4. Pachama MRV Methodology Documentation
5. Google Earth Engine Dynamic World Dataset

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Status:** Implementation Ready
