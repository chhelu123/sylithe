const ChangeDetectionPanel = ({ changeData }) => {
  if (!changeData) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>Change Detection</h3>
        <p style={styles.placeholder}>
          Create a baseline and select a comparison year to see changes
        </p>
      </div>
    );
  }

  const { baseline_year, current_year, years_elapsed, changes, transitions, summary } = changeData;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Change Detection</h3>
      
      <div style={styles.period}>
        <strong>{baseline_year}</strong> → <strong>{current_year}</strong>
        <span style={styles.elapsed}>({years_elapsed} years)</span>
      </div>

      {summary.significant_changes && summary.significant_changes.length > 0 && (
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Key Changes</h4>
          {summary.significant_changes.slice(0, 3).map((change, idx) => (
            <div key={idx} style={styles.changeItem}>
              <div style={styles.changeName}>{change.class}</div>
              <div style={{
                ...styles.changeValue,
                color: change.change > 0 ? '#22c55e' : '#ef4444'
              }}>
                {change.change > 0 ? '↑' : '↓'} {Math.abs(change.change).toFixed(1)}%
              </div>
              <div style={styles.changeSummary}>{change.summary}</div>
            </div>
          ))}
        </div>
      )}

      {Object.keys(transitions).length > 0 && (
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Land Transitions</h4>
          {Object.entries(transitions).map(([key, transition]) => (
            <div key={key} style={styles.transitionItem}>
              <div style={styles.transitionFlow}>
                {transition.from_class} → {transition.to_class}
              </div>
              <div style={styles.transitionArea}>
                {transition.area_km2} km²
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>All Classes</h4>
        <div style={styles.detailsGrid}>
          {Object.entries(changes).map(([key, change]) => (
            <div key={key} style={styles.detailItem}>
              <div style={styles.detailName}>{change.class_name}</div>
              <div style={styles.detailChange}>
                <span style={{color: change.change_pct > 0 ? '#22c55e' : change.change_pct < 0 ? '#ef4444' : '#94a3b8'}}>
                  {change.change_pct > 0 ? '+' : ''}{change.change_pct}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
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
  period: {
    padding: '12px',
    background: 'rgba(132,204,22,0.1)',
    borderRadius: '8px',
    marginBottom: '15px',
    textAlign: 'center',
    fontSize: '1rem',
    color: '#0F172A',
    border: '1px solid rgba(132,204,22,0.2)'
  },
  elapsed: {
    fontSize: '0.85rem',
    color: '#475569',
    marginLeft: '8px'
  },
  section: {
    marginBottom: '20px'
  },
  sectionTitle: {
    fontSize: '0.95rem',
    marginBottom: '10px',
    color: '#0F172A'
  },
  changeItem: {
    padding: '10px',
    background: 'rgba(132,204,22,0.05)',
    borderRadius: '6px',
    marginBottom: '8px',
    border: '1px solid rgba(132,204,22,0.15)'
  },
  changeName: {
    fontWeight: '600',
    marginBottom: '4px',
    color: '#0F172A'
  },
  changeValue: {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '4px'
  },
  changeSummary: {
    fontSize: '0.85rem',
    color: '#475569'
  },
  transitionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    background: 'rgba(132,204,22,0.05)',
    borderRadius: '6px',
    marginBottom: '6px',
    border: '1px solid rgba(132,204,22,0.15)'
  },
  transitionFlow: {
    fontSize: '0.85rem',
    color: '#0F172A'
  },
  transitionArea: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#f59e0b'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px'
  },
  detailItem: {
    padding: '8px',
    background: 'rgba(132,204,22,0.05)',
    borderRadius: '6px',
    fontSize: '0.85rem',
    border: '1px solid rgba(132,204,22,0.15)'
  },
  detailName: {
    marginBottom: '4px',
    color: '#0F172A'
  },
  detailChange: {
    fontWeight: '600'
  }
};

export default ChangeDetectionPanel;
