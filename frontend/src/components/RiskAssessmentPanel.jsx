const RiskAssessmentPanel = ({ riskData }) => {
  if (!riskData) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>Risk Assessment</h3>
        <p style={styles.placeholder}>
          Complete change detection to see carbon risk analysis
        </p>
      </div>
    );
  }

  const { risk_score, risk_level, permanence_confidence, flags, summary } = riskData;

  const getRiskColor = (level) => {
    switch(level) {
      case 'CRITICAL': return '#ef4444';
      case 'HIGH': return '#f59e0b';
      case 'MEDIUM': return '#eab308';
      case 'LOW': return '#22c55e';
      default: return '#94a3b8';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'CRITICAL': return '#ef4444';
      case 'HIGH': return '#f59e0b';
      case 'MEDIUM': return '#eab308';
      case 'LOW': return '#22c55e';
      default: return '#94a3b8';
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Carbon Risk Assessment</h3>
      
      <div style={{...styles.riskBadge, background: getRiskColor(risk_level)}}>
        <div style={styles.riskLevel}>{risk_level} RISK</div>
        <div style={styles.riskScore}>Risk Score: {risk_score}/100</div>
      </div>

      <div style={styles.confidenceBox}>
        <div style={styles.confidenceLabel}>Permanence Confidence</div>
        <div style={styles.confidenceValue}>{permanence_confidence}%</div>
        <div style={styles.confidenceBar}>
          <div style={{
            ...styles.confidenceFill,
            width: `${permanence_confidence}%`,
            background: permanence_confidence > 70 ? '#22c55e' : permanence_confidence > 40 ? '#f59e0b' : '#ef4444'
          }} />
        </div>
      </div>

      {summary && (
        <div style={styles.summaryBox}>
          <div style={styles.verdict}>{summary.verdict}</div>
          <div style={styles.message}>{summary.message}</div>
          <div style={styles.action}>
            <strong>Action:</strong> {summary.action}
          </div>
        </div>
      )}

      {flags && flags.length > 0 && (
        <div style={styles.flagsSection}>
          <h4 style={styles.sectionTitle}>
            Risk Flags ({flags.length})
          </h4>
          {flags.map((flag, idx) => (
            <div key={idx} style={styles.flagItem}>
              <div style={styles.flagHeader}>
                <span style={{
                  ...styles.flagSeverity,
                  background: getSeverityColor(flag.severity)
                }}>
                  {flag.severity}
                </span>
                <span style={styles.flagType}>{flag.type.replace(/_/g, ' ')}</span>
              </div>
              <div style={styles.flagReason}>{flag.reason}</div>
              <div style={styles.flagExplanation}>{flag.explanation}</div>
              <div style={styles.flagRecommendation}>
                <strong>→</strong> {flag.recommendation}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: 'rgba(132,204,22,0.08)',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '1px solid rgba(132,204,22,0.2)'
  },
  title: {
    marginBottom: '15px',
    fontSize: '1.1rem',
    color: '#0F172A'
  },
  placeholder: {
    fontSize: '0.85rem',
    color: '#475569',
    lineHeight: 1.4
  },
  riskBadge: {
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    textAlign: 'center'
  },
  riskLevel: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '5px',
    color: '#ffffff'
  },
  riskScore: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.9)'
  },
  confidenceBox: {
    background: 'rgba(132,204,22,0.1)',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    border: '1px solid rgba(132,204,22,0.2)'
  },
  confidenceLabel: {
    fontSize: '0.85rem',
    color: '#475569',
    marginBottom: '8px'
  },
  confidenceValue: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#0F172A'
  },
  confidenceBar: {
    width: '100%',
    height: '8px',
    background: 'rgba(0,0,0,0.1)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  confidenceFill: {
    height: '100%',
    transition: 'width 0.3s ease'
  },
  summaryBox: {
    background: 'rgba(132,204,22,0.1)',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    border: '1px solid rgba(132,204,22,0.2)'
  },
  verdict: {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#0F172A'
  },
  message: {
    fontSize: '0.9rem',
    lineHeight: 1.5,
    marginBottom: '10px',
    color: '#475569'
  },
  action: {
    fontSize: '0.85rem',
    padding: '10px',
    background: 'rgba(132,204,22,0.1)',
    borderRadius: '6px',
    color: '#0F172A',
    border: '1px solid rgba(132,204,22,0.2)'
  },
  flagsSection: {
    marginTop: '20px'
  },
  sectionTitle: {
    fontSize: '0.95rem',
    marginBottom: '10px',
    color: '#0F172A'
  },
  flagItem: {
    background: 'rgba(132,204,22,0.05)',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '10px',
    border: '1px solid rgba(132,204,22,0.15)'
  },
  flagHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px'
  },
  flagSeverity: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#ffffff'
  },
  flagType: {
    fontSize: '0.85rem',
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#0F172A'
  },
  flagReason: {
    fontSize: '0.9rem',
    marginBottom: '6px',
    fontWeight: '500',
    color: '#0F172A'
  },
  flagExplanation: {
    fontSize: '0.85rem',
    color: '#475569',
    marginBottom: '8px',
    lineHeight: 1.4
  },
  flagRecommendation: {
    fontSize: '0.85rem',
    padding: '8px',
    background: 'rgba(132,204,22,0.1)',
    borderRadius: '6px',
    fontStyle: 'italic',
    color: '#0F172A',
    border: '1px solid rgba(132,204,22,0.2)'
  }
};

export default RiskAssessmentPanel;
