"""
Change Detection Engine
Computes LULC transitions and changes between baseline and current year
"""

LULC_CLASSES = {
    0: "Water",
    1: "Trees",
    2: "Grass",
    3: "Flooded Vegetation",
    4: "Crops",
    5: "Shrub & Scrub",
    6: "Built Area",
    7: "Bare Ground",
    8: "Snow & Ice"
}

def calculate_changes(baseline_stats: dict, current_stats: dict, area_km2: float):
    """
    Calculate changes between baseline and current year
    Returns absolute and percentage changes for each class
    """
    changes = {}
    
    # Get total pixels for percentage calculation
    baseline_total = sum(baseline_stats.values())
    current_total = sum(current_stats.values())
    
    for class_id in range(9):
        class_id_str = str(class_id)
        class_name = LULC_CLASSES[class_id]
        
        baseline_pixels = baseline_stats.get(class_id_str, 0)
        current_pixels = current_stats.get(class_id_str, 0)
        
        # Calculate percentages
        baseline_pct = (baseline_pixels / baseline_total * 100) if baseline_total > 0 else 0
        current_pct = (current_pixels / current_total * 100) if current_total > 0 else 0
        
        # Calculate changes
        pixel_change = current_pixels - baseline_pixels
        pct_change = current_pct - baseline_pct
        
        # Calculate area change (assuming 10m resolution = 100m² per pixel)
        area_change_km2 = (pixel_change * 100) / 1e6
        
        # Generate human-readable summary
        if abs(pct_change) < 0.1:
            summary = f"{class_name} remained stable"
        elif pct_change > 0:
            summary = f"{class_name} increased by {abs(pct_change):.1f}% ({abs(area_change_km2):.2f} km²)"
        else:
            summary = f"{class_name} decreased by {abs(pct_change):.1f}% ({abs(area_change_km2):.2f} km²)"
        
        changes[class_name.lower().replace(" ", "_")] = {
            "class_id": class_id,
            "class_name": class_name,
            "baseline_pct": round(baseline_pct, 2),
            "current_pct": round(current_pct, 2),
            "baseline_km2": round((baseline_pixels * 100) / 1e6, 2),
            "current_km2": round((current_pixels * 100) / 1e6, 2),
            "change_km2": round(area_change_km2, 2),
            "change_pct": round(pct_change, 2),
            "summary": summary
        }
    
    return changes

def detect_key_transitions(baseline_stats: dict, current_stats: dict):
    """
    Detect significant LULC transitions (e.g., forest to urban)
    """
    transitions = {}
    
    # Key transitions to monitor
    transition_pairs = [
        (1, 6, "forest_to_urban"),      # Trees → Built
        (1, 7, "forest_to_bare"),       # Trees → Bare
        (4, 1, "cropland_to_forest"),   # Crops → Trees
        (2, 6, "grass_to_urban"),       # Grass → Built
        (0, 7, "water_loss"),           # Water → Bare
    ]
    
    for from_class, to_class, transition_name in transition_pairs:
        from_str = str(from_class)
        to_str = str(to_class)
        
        baseline_from = baseline_stats.get(from_str, 0)
        current_from = current_stats.get(from_str, 0)
        current_to = current_stats.get(to_str, 0)
        baseline_to = baseline_stats.get(to_str, 0)
        
        # Estimate transition (simplified)
        from_loss = max(0, baseline_from - current_from)
        to_gain = max(0, current_to - baseline_to)
        
        # Assume some of the loss contributed to the gain
        estimated_transition = min(from_loss, to_gain)
        transition_km2 = (estimated_transition * 100) / 1e6
        
        if transition_km2 > 0.01:  # Only report if > 0.01 km²
            transitions[transition_name] = {
                "from_class": LULC_CLASSES[from_class],
                "to_class": LULC_CLASSES[to_class],
                "area_km2": round(transition_km2, 2),
                "description": f"{LULC_CLASSES[from_class]} converted to {LULC_CLASSES[to_class]}"
            }
    
    return transitions

def generate_change_summary(changes: dict, baseline_year: int, current_year: int):
    """
    Generate executive summary of changes
    """
    significant_changes = []
    
    for class_key, change_data in changes.items():
        if abs(change_data["change_pct"]) > 5:  # Significant if > 5%
            significant_changes.append({
                "class": change_data["class_name"],
                "change": change_data["change_pct"],
                "summary": change_data["summary"]
            })
    
    # Sort by absolute change
    significant_changes.sort(key=lambda x: abs(x["change"]), reverse=True)
    
    return {
        "baseline_year": baseline_year,
        "current_year": current_year,
        "years_elapsed": current_year - baseline_year,
        "significant_changes": significant_changes,
        "total_classes_changed": len(significant_changes)
    }
