import { useState } from 'react';

const BaselinePanel = ({ baseline, onCreateBaseline, onLockBaseline, loading }) => {
  const [selectedYear, setSelectedYear] = useState(2019);
  const years = [2018, 2019, 2020, 2021, 2022, 2023];

  if (!baseline) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>Set Baseline</h3>
        <p style={styles.description}>
          Select a baseline year to establish the reference point for change detection
        </p>
        
        <div style={styles.yearSelector}>
          <label style={styles.label}>Baseline Year:</label>
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            style={styles.select}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => onCreateBaseline(selectedYear)}
          disabled={loading}
          style={styles.createBtn}
        >
          {loading ? 'Creating...' : 'Create Baseline'}
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>
        Baseline {baseline.locked && '(Locked)'}
      </h3>
      
      <div style={styles.info}>
        <div style={styles.infoRow}>
          <strong>Year:</strong> {baseline.baseline_year}
        </div>
        <div style={styles.infoRow}>
          <strong>Area:</strong> {baseline.area_km2?.toFixed(2)} km²
        </div>
        <div style={styles.infoRow}>
          <strong>Status:</strong> {baseline.locked ? 'Locked' : 'Unlocked'}
        </div>
        {baseline.locked_at && (
          <div style={styles.infoRow}>
            <strong>Locked:</strong> {new Date(baseline.locked_at).toLocaleDateString()}
          </div>
        )}
      </div>

      {!baseline.locked && (
        <button 
          onClick={() => onLockBaseline(baseline.baseline_id)}
          disabled={loading}
          style={styles.lockBtn}
        >
          {loading ? 'Locking...' : 'Lock Baseline'}
        </button>
      )}

      {baseline.locked && (
        <div style={styles.lockedMessage}>
          Baseline is permanently locked and cannot be modified
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
    marginBottom: '10px',
    fontSize: '1.1rem',
    color: '#0F172A'
  },
  description: {
    fontSize: '0.85rem',
    color: '#475569',
    marginBottom: '15px',
    lineHeight: 1.4
  },
  yearSelector: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.9rem',
    color: '#0F172A'
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid rgba(132,204,22,0.3)',
    background: '#ffffff',
    color: '#0F172A',
    fontSize: '14px',
    cursor: 'pointer'
  },
  createBtn: {
    width: '100%',
    padding: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
    color: '#064e3b',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s'
  },
  info: {
    marginBottom: '15px'
  },
  infoRow: {
    padding: '8px 0',
    borderBottom: '1px solid rgba(132,204,22,0.2)',
    fontSize: '0.9rem',
    color: '#0F172A'
  },
  lockBtn: {
    width: '100%',
    padding: '12px',
    border: 'none',
    background: '#f59e0b',
    color: '#ffffff',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s'
  },
  lockedMessage: {
    padding: '12px',
    background: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '8px',
    fontSize: '0.85rem',
    textAlign: 'center',
    color: '#0F172A',
    border: '1px solid rgba(34, 197, 94, 0.3)'
  }
};

export default BaselinePanel;
