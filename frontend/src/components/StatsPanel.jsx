const LULC_CLASSES = {
  0: { name: 'Water', color: '#419BDF' },
  1: { name: 'Trees', color: '#397D49' },
  2: { name: 'Grass', color: '#88B053' },
  3: { name: 'Flooded Vegetation', color: '#7A87C6' },
  4: { name: 'Crops', color: '#E49635' },
  5: { name: 'Shrub & Scrub', color: '#DFC35A' },
  6: { name: 'Built Area', color: '#C4281B' },
  7: { name: 'Bare Ground', color: '#A59B8F' },
  8: { name: 'Snow & Ice', color: '#B39FE1' }
};

const StatsPanel = ({ stats, area, year }) => {
  if (!stats) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>Results</h3>
        <p style={styles.placeholder}>Draw a polygon to see analysis results</p>
      </div>
    );
  }

  const total = Object.values(stats).reduce((sum, val) => sum + val, 0);

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>
        {year ? `Results (${year})` : 'Analysis Results'}
      </h3>
      <div style={styles.areaBox}>
        <strong>Total Area:</strong> {area?.toFixed(2)} km²
      </div>
      
      <div style={styles.statsContainer}>
        {Object.entries(stats).map(([classId, count]) => {
          const percentage = ((count / total) * 100).toFixed(1);
          const classInfo = LULC_CLASSES[classId];
          
          return (
            <div key={classId} style={styles.statItem}>
              <div style={styles.statHeader}>
                <div style={{...styles.colorBox, background: classInfo.color}} />
                <span style={styles.className}>{classInfo.name}</span>
              </div>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: `${percentage}%`, background: classInfo.color}} />
              </div>
              <span style={styles.percentage}>{percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'rgba(132,204,22,0.08)',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '20px',
    border: '1px solid rgba(132,204,22,0.2)'
  },
  title: {
    marginBottom: '15px',
    fontSize: '1.2rem',
    color: '#0F172A'
  },
  placeholder: {
    color: '#475569',
    fontSize: '0.9rem'
  },
  areaBox: {
    background: 'rgba(132,204,22,0.1)',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '0.95rem',
    color: '#0F172A',
    border: '1px solid rgba(132,204,22,0.2)'
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  statHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  colorBox: {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    flexShrink: 0
  },
  className: {
    fontSize: '0.9rem',
    flex: 1,
    color: '#0F172A'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    background: 'rgba(0,0,0,0.1)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    transition: 'width 0.3s ease'
  },
  percentage: {
    fontSize: '0.85rem',
    color: '#475569',
    textAlign: 'right'
  }
};

export default StatsPanel;
