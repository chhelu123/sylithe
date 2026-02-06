"""
Carbon Risk Assessment Engine
Evaluates permanence, reversal risk, and project integrity
"""

def calculate_volatility(timeline_stats: list):
    """
    Calculate year-to-year LULC volatility
    High volatility = unstable land use
    """
    if len(timeline_stats) < 2:
        return 0.0
    
    volatility_scores = []
    
    for i in range(1, len(timeline_stats)):
        prev_stats = timeline_stats[i-1]["stats"]
        curr_stats = timeline_stats[i]["stats"]
        
        # Calculate total change between years
        total_change = 0
        for class_id in range(9):
            class_str = str(class_id)
            prev_val = prev_stats.get(class_str, 0)
            curr_val = curr_stats.get(class_str, 0)
            total_change += abs(curr_val - prev_val)
        
        # Normalize by total pixels
        total_pixels = sum(curr_stats.values())
        if total_pixels > 0:
            volatility_scores.append(total_change / total_pixels)
    
    return sum(volatility_scores) / len(volatility_scores) if volatility_scores else 0.0

def assess_carbon_risk(baseline_stats: dict, current_stats: dict, timeline_stats: list = None):
    """
    Comprehensive carbon risk assessment
    Returns risk score, flags, and permanence confidence
    """
    risk_score = 0
    flags = []
    
    # Get total pixels for percentage calculation
    baseline_total = sum(baseline_stats.values())
    current_total = sum(current_stats.values())
    
    # Calculate percentages for key classes
    baseline_trees_pct = (baseline_stats.get("1", 0) / baseline_total * 100) if baseline_total > 0 else 0
    current_trees_pct = (current_stats.get("1", 0) / current_total * 100) if current_total > 0 else 0
    
    baseline_built_pct = (baseline_stats.get("6", 0) / baseline_total * 100) if baseline_total > 0 else 0
    current_built_pct = (current_stats.get("6", 0) / current_total * 100) if current_total > 0 else 0
    
    baseline_water_pct = (baseline_stats.get("0", 0) / baseline_total * 100) if baseline_total > 0 else 0
    current_water_pct = (current_stats.get("0", 0) / current_total * 100) if current_total > 0 else 0
    
    # Rule 1: Urbanization Risk (HIGH PRIORITY)
    built_growth = current_built_pct - baseline_built_pct
    if built_growth > 20:
        risk_score += 40
        flags.append({
            "type": "URBANIZATION_RISK",
            "severity": "CRITICAL",
            "score_impact": 40,
            "reason": f"Built-up area increased by {built_growth:.1f}%",
            "explanation": "Rapid urbanization indicates high reversal risk. Carbon sequestration may be reversed by development.",
            "recommendation": "Project not suitable for carbon credits due to urban encroachment"
        })
    elif built_growth > 10:
        risk_score += 25
        flags.append({
            "type": "URBANIZATION_RISK",
            "severity": "HIGH",
            "score_impact": 25,
            "reason": f"Built-up area increased by {built_growth:.1f}%",
            "explanation": "Moderate urban expansion detected. Permanence may be compromised.",
            "recommendation": "Implement buffer zones and monitoring protocols"
        })
    elif built_growth > 5:
        risk_score += 10
        flags.append({
            "type": "URBANIZATION_RISK",
            "severity": "MEDIUM",
            "score_impact": 10,
            "reason": f"Built-up area increased by {built_growth:.1f}%",
            "explanation": "Minor urban growth detected. Monitor for acceleration.",
            "recommendation": "Increase monitoring frequency"
        })
    
    # Rule 2: Deforestation Risk
    tree_loss_pct = baseline_trees_pct - current_trees_pct
    if tree_loss_pct > 15:
        risk_score += 35
        flags.append({
            "type": "DEFORESTATION",
            "severity": "CRITICAL",
            "score_impact": 35,
            "reason": f"Tree cover decreased by {tree_loss_pct:.1f}%",
            "explanation": "Significant forest loss detected. Project fails permanence criteria.",
            "recommendation": "Project ineligible for carbon credits"
        })
    elif tree_loss_pct > 10:
        risk_score += 20
        flags.append({
            "type": "DEFORESTATION",
            "severity": "HIGH",
            "score_impact": 20,
            "reason": f"Tree cover decreased by {tree_loss_pct:.1f}%",
            "explanation": "Moderate deforestation detected. Reversal risk is high.",
            "recommendation": "Investigate causes and implement protection measures"
        })
    elif tree_loss_pct > 5:
        risk_score += 10
        flags.append({
            "type": "DEFORESTATION",
            "severity": "MEDIUM",
            "score_impact": 10,
            "reason": f"Tree cover decreased by {tree_loss_pct:.1f}%",
            "explanation": "Minor forest loss. May be within natural variation.",
            "recommendation": "Continue monitoring"
        })
    
    # Rule 3: Water Body Changes
    water_loss_pct = baseline_water_pct - current_water_pct
    if abs(water_loss_pct) > 10:
        risk_score += 15
        flags.append({
            "type": "WATER_INSTABILITY",
            "severity": "MEDIUM",
            "score_impact": 15,
            "reason": f"Water bodies changed by {abs(water_loss_pct):.1f}%",
            "explanation": "Significant water body changes indicate environmental instability.",
            "recommendation": "Assess hydrological impacts on project"
        })
    
    # Rule 4: LULC Volatility (if timeline available)
    if timeline_stats and len(timeline_stats) > 2:
        volatility = calculate_volatility(timeline_stats)
        if volatility > 0.25:
            risk_score += 20
            flags.append({
                "type": "HIGH_VOLATILITY",
                "severity": "HIGH",
                "score_impact": 20,
                "reason": f"LULC volatility index: {volatility:.2f}",
                "explanation": "High year-to-year land use changes indicate instability.",
                "recommendation": "Project requires enhanced monitoring and verification"
            })
        elif volatility > 0.15:
            risk_score += 10
            flags.append({
                "type": "MODERATE_VOLATILITY",
                "severity": "MEDIUM",
                "score_impact": 10,
                "reason": f"LULC volatility index: {volatility:.2f}",
                "explanation": "Moderate land use variability detected.",
                "recommendation": "Quarterly monitoring recommended"
            })
    
    # Rule 5: Positive Indicators (reduce risk)
    tree_gain_pct = current_trees_pct - baseline_trees_pct
    if tree_gain_pct > 15:
        risk_score = max(0, risk_score - 15)
        flags.append({
            "type": "POSITIVE_REFORESTATION",
            "severity": "LOW",
            "score_impact": -15,
            "reason": f"Tree cover increased by {tree_gain_pct:.1f}%",
            "explanation": "Significant reforestation detected. Strong additionality.",
            "recommendation": "Project shows positive carbon sequestration trend"
        })
    
    # Calculate Permanence Confidence Index (0-100)
    permanence_confidence = max(0, min(100, 100 - risk_score))
    
    # Determine overall risk level
    if risk_score >= 60:
        risk_level = "CRITICAL"
    elif risk_score >= 40:
        risk_level = "HIGH"
    elif risk_score >= 20:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"
    
    return {
        "risk_score": risk_score,
        "risk_level": risk_level,
        "permanence_confidence": permanence_confidence,
        "flags": flags,
        "total_flags": len(flags),
        "critical_flags": len([f for f in flags if f["severity"] == "CRITICAL"]),
        "high_flags": len([f for f in flags if f["severity"] == "HIGH"]),
        "summary": generate_risk_summary(risk_level, permanence_confidence, flags)
    }

def generate_risk_summary(risk_level: str, permanence: float, flags: list):
    """Generate executive risk summary"""
    if risk_level == "CRITICAL":
        return {
            "verdict": "PROJECT REJECTED",
            "confidence": "HIGH",
            "message": f"Critical risks detected. Permanence confidence: {permanence}%. Project does not meet carbon credit eligibility criteria.",
            "action": "Do not proceed with carbon credit issuance"
        }
    elif risk_level == "HIGH":
        return {
            "verdict": "HIGH RISK",
            "confidence": "MEDIUM",
            "message": f"Significant risks identified. Permanence confidence: {permanence}%. Enhanced due diligence required.",
            "action": "Proceed with caution. Implement additional safeguards."
        }
    elif risk_level == "MEDIUM":
        return {
            "verdict": "MODERATE RISK",
            "confidence": "GOOD",
            "message": f"Acceptable risk level. Permanence confidence: {permanence}%. Standard monitoring protocols apply.",
            "action": "Proceed with standard verification procedures"
        }
    else:
        return {
            "verdict": "LOW RISK",
            "confidence": "HIGH",
            "message": f"Minimal risks detected. Permanence confidence: {permanence}%. Project shows strong integrity.",
            "action": "Proceed with carbon credit issuance"
        }
