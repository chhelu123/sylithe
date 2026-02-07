export default function MetricCard({ icon, label, value, unit, trend, color = '#84cc16' }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={{...styles.icon, background: `${color}15`}}>{icon}</span>
        {trend && <span style={{...styles.trend, color: trend > 0 ? '#10b981' : '#ef4444'}}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>}
      </div>
      <div style={styles.label}>{label}</div>
      <div style={styles.value}>
        {value}
        {unit && <span style={styles.unit}>{unit}</span>}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    transition: 'all 0.3s',
    cursor: 'pointer'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  icon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px'
  },
  trend: {
    fontSize: '12px',
    fontWeight: '600'
  },
  label: {
    fontSize: '13px',
    color: '#64748b',
    marginBottom: '8px',
    fontWeight: '500'
  },
  value: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#0f172a'
  },
  unit: {
    fontSize: '16px',
    color: '#64748b',
    marginLeft: '4px',
    fontWeight: '500'
  }
};
