import { useState } from 'react';

export default function DACBPanel({ dacbData }) {
  const [activeTab, setActiveTab] = useState('baseline');

  if (!dacbData) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>DACB Analysis</h3>
        <p style={styles.placeholder}>
          Configure baseline and current year, then run DACB analysis
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>DACB Results</h3>
      
      {/* Tab Navigation */}
      <div style={styles.tabNav}>
        <button 
          onClick={() => setActiveTab('baseline')} 
          style={{...styles.tab, ...(activeTab === 'baseline' ? styles.activeTab : {})}}
        >
          Baseline
        </button>
        <button 
          onClick={() => setActiveTab('trends')} 
          style={{...styles.tab, ...(activeTab === 'trends' ? styles.activeTab : {})}}
        >
          Trends
        </button>
        <button 
          onClick={() => setActiveTab('credits')} 
          style={{...styles.tab, ...(activeTab === 'credits' ? styles.activeTab : {})}}
        >
          Credits
        </button>
        <button 
          onClick={() => setActiveTab('quality')} 
          style={{...styles.tab, ...(activeTab === 'quality' ? styles.activeTab : {})}}
        >
          Quality
        </button>
      </div>

      {/* Tab Content */}
      <div style={styles.tabContent}>
        {activeTab === 'baseline' && <BaselineTab data={dacbData} />}
        {activeTab === 'trends' && <TrendsTab data={dacbData} />}
        {activeTab === 'credits' && <CreditsTab data={dacbData} />}
        {activeTab === 'quality' && <QualityTab data={dacbData} />}
      </div>
    </div>
  );
}

// Baseline Tab
function BaselineTab({ data }) {
  return (
    <div>
      <div style={styles.metric}>
        <div style={styles.metricLabel}>Baseline Model</div>
        <div style={styles.metricValue}>{data.baseline_model}</div>
      </div>

      <div style={styles.metric}>
        <div style={styles.metricLabel}>Period</div>
        <div style={styles.metricValue}>
          {data.baseline_year} → {data.current_year} ({data.years_elapsed} years)
        </div>
      </div>

      <div style={styles.comparisonBox}>
        <div style={styles.comparisonTitle}>Expected vs Observed</div>
        <div style={styles.comparisonGrid}>
          <div>
            <div style={styles.comparisonLabel}>Expected (Baseline)</div>
            <div style={{...styles.comparisonValue, color: '#3b82f6'}}>
              {data.expected_forest_km2} km²
            </div>
          </div>
          <div>
            <div style={styles.comparisonLabel}>Observed (Actual)</div>
            <div style={{...styles.comparisonValue, color: '#84cc16'}}>
              {data.observed_forest_km2} km²
            </div>
          </div>
        </div>
      </div>

      <div style={styles.infoBox}>
        <strong>Control Trend:</strong> {data.control_trend_km2_per_year} km²/year forest loss
      </div>
    </div>
  );
}

// Trends Tab
function TrendsTab({ data }) {
  return (
    <div>
      <div style={styles.trendSection}>
        <div style={styles.trendTitle}>Project Area</div>
        <div style={styles.trendGrid}>
          <div style={styles.trendItem}>
            <span>Baseline:</span>
            <strong>{data.project_forest_baseline_km2} km²</strong>
          </div>
          <div style={styles.trendItem}>
            <span>Current:</span>
            <strong>{data.project_forest_current_km2} km²</strong>
          </div>
          <div style={styles.trendItem}>
            <span>Change:</span>
            <strong style={{color: '#ef4444'}}>
              {(data.project_forest_current_km2 - data.project_forest_baseline_km2).toFixed(2)} km²
            </strong>
          </div>
        </div>
      </div>

      <div style={styles.trendSection}>
        <div style={styles.trendTitle}>Control Area ({data.buffer_km}km buffer)</div>
        <div style={styles.trendGrid}>
          <div style={styles.trendItem}>
            <span>Baseline:</span>
            <strong>{data.control_forest_baseline_km2} km²</strong>
          </div>
          <div style={styles.trendItem}>
            <span>Current:</span>
            <strong>{data.control_forest_current_km2} km²</strong>
          </div>
          <div style={styles.trendItem}>
            <span>Change:</span>
            <strong style={{color: '#ef4444'}}>
              {(data.control_forest_current_km2 - data.control_forest_baseline_km2).toFixed(2)} km²
            </strong>
          </div>
        </div>
      </div>

      <div style={styles.highlightBox}>
        <strong>Control Trend Rate:</strong> {data.control_trend_km2_per_year} km²/year
      </div>
    </div>
  );
}

// Credits Tab
function CreditsTab({ data }) {
  return (
    <div>
      <div style={styles.creditCard}>
        <div style={styles.creditLabel}>Avoided Deforestation</div>
        <div style={{...styles.creditValue, color: '#84cc16'}}>
          {data.avoided_deforestation_km2} km²
        </div>
      </div>

      <div style={styles.adjustmentBox}>
        <div style={styles.adjustmentTitle}>Leakage Adjustment</div>
        <div style={styles.adjustmentRow}>
          <span>Leakage Ratio:</span>
          <strong>{data.leakage_ratio}x ({data.leakage_severity})</strong>
        </div>
        <div style={styles.adjustmentRow}>
          <span>Discount Factor (λ):</span>
          <strong>{data.leakage_adjustment_factor}</strong>
        </div>
      </div>

      <div style={styles.finalCredit}>
        <div style={styles.finalLabel}>Adjusted Credits</div>
        <div style={styles.finalValue}>
          {data.adjusted_avoided_deforestation_km2} km²
        </div>
      </div>

      <div style={styles.permanenceBox}>
        <div style={styles.permanenceLabel}>Permanence Confidence</div>
        <div style={styles.permanenceValue}>{data.permanence_score}%</div>
        <div style={styles.permanenceBar}>
          <div style={{
            ...styles.permanenceFill,
            width: `${data.permanence_score}%`,
            background: data.permanence_score > 70 ? '#84cc16' : data.permanence_score > 50 ? '#f59e0b' : '#ef4444'
          }} />
        </div>
      </div>

      <div style={{...styles.confidenceBadge, 
        background: data.confidence === 'HIGH' ? 'rgba(132,204,22,0.15)' : 
                   data.confidence === 'MEDIUM' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
        border: `1px solid ${data.confidence === 'HIGH' ? 'rgba(132,204,22,0.3)' : 
                             data.confidence === 'MEDIUM' ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)'}`
      }}>
        <strong>Confidence:</strong> {data.confidence}
      </div>
    </div>
  );
}

// Quality Tab
function QualityTab({ data }) {
  const quality = data.control_area_quality;
  const selection = data.control_selection;
  
  return (
    <div>
      {selection.method === 'KNN' && (
        <div style={styles.knnBadge}>
          <strong>🎯 KNN-Selected Control Areas</strong>
          <div style={styles.knnDetails}>
            <div>K = {selection.k_value} tiles</div>
            <div>Avg Similarity: {(selection.avg_similarity * 100).toFixed(1)}%</div>
          </div>
        </div>
      )}

      <div style={styles.qualityScore}>
        <div style={styles.qualityLabel}>Control Area Quality</div>
        <div style={{
          ...styles.qualityBadge,
          background: quality.quality === 'HIGH' ? '#84cc16' : quality.quality === 'MEDIUM' ? '#f59e0b' : '#ef4444'
        }}>
          {quality.quality}
        </div>
      </div>

      <div style={styles.similarityBox}>
        <div style={styles.similarityLabel}>Similarity Score</div>
        <div style={styles.similarityValue}>{(quality.similarity_score * 100).toFixed(0)}%</div>
        <div style={styles.similarityBar}>
          <div style={{
            ...styles.similarityFill,
            width: `${quality.similarity_score * 100}%`,
            background: quality.quality === 'HIGH' ? '#84cc16' : quality.quality === 'MEDIUM' ? '#f59e0b' : '#ef4444'
          }} />
        </div>
      </div>

      <div style={styles.forestComparison}>
        <div style={styles.forestItem}>
          <span>Project Forest Cover:</span>
          <strong>{quality.project_forest_pct}%</strong>
        </div>
        <div style={styles.forestItem}>
          <span>Control Forest Cover:</span>
          <strong>{quality.control_forest_pct}%</strong>
        </div>
        <div style={styles.forestItem}>
          <span>Difference:</span>
          <strong>{Math.abs(quality.project_forest_pct - quality.control_forest_pct).toFixed(1)}%</strong>
        </div>
      </div>

      <div style={styles.qualityNote}>
        {quality.quality === 'HIGH' && 
          'Control area is highly representative of project area conditions.'}
        {quality.quality === 'MEDIUM' && 
          'Control area shows moderate similarity. Results are acceptable but may have some uncertainty.'}
        {quality.quality === 'LOW' && 
          'Control area similarity is low. Consider adjusting buffer size or using KNN selection.'}
      </div>
    </div>
  );
}

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
    fontSize: '1.1rem',
    color: '#0F172A',
    fontWeight: '700'
  },
  placeholder: {
    fontSize: '0.85rem',
    color: '#475569',
    lineHeight: 1.4
  },
  tabNav: {
    display: 'flex',
    gap: '4px',
    marginBottom: '16px',
    borderBottom: '1px solid rgba(132,204,22,0.2)',
    paddingBottom: '0'
  },
  tab: {
    flex: 1,
    padding: '10px 12px',
    border: 'none',
    background: 'transparent',
    color: '#64748b',
    borderRadius: '6px 6px 0 0',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    transition: 'all 0.2s'
  },
  activeTab: {
    color: '#84cc16',
    background: 'rgba(132,204,22,0.1)',
    boxShadow: '0 -2px 0 0 #84cc16 inset'
  },
  tabContent: {
    animation: 'fadeIn 0.3s ease-in'
  },
  metric: {
    marginBottom: '12px',
    padding: '12px',
    background: 'rgba(132,204,22,0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(132,204,22,0.15)'
  },
  metricLabel: {
    fontSize: '11px',
    color: '#64748b',
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  metricValue: {
    fontSize: '14px',
    color: '#0F172A',
    fontWeight: '600'
  },
  comparisonBox: {
    padding: '16px',
    background: 'rgba(132,204,22,0.05)',
    borderRadius: '8px',
    marginBottom: '12px',
    border: '1px solid rgba(132,204,22,0.15)'
  },
  comparisonTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '12px'
  },
  comparisonGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  comparisonLabel: {
    fontSize: '11px',
    color: '#64748b',
    marginBottom: '4px'
  },
  comparisonValue: {
    fontSize: '18px',
    fontWeight: '700'
  },
  infoBox: {
    padding: '12px',
    background: 'rgba(132,204,22,0.1)',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#0F172A',
    border: '1px solid rgba(132,204,22,0.2)'
  },
  trendSection: {
    marginBottom: '16px',
    padding: '14px',
    background: 'rgba(132,204,22,0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(132,204,22,0.15)'
  },
  trendTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '10px'
  },
  trendGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  trendItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#475569'
  },
  highlightBox: {
    padding: '12px',
    background: 'rgba(132,204,22,0.15)',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#0F172A',
    fontWeight: '600',
    border: '1px solid rgba(132,204,22,0.3)'
  },
  creditCard: {
    padding: '20px',
    background: 'rgba(132,204,22,0.1)',
    borderRadius: '12px',
    marginBottom: '16px',
    textAlign: 'center',
    border: '1px solid rgba(132,204,22,0.3)'
  },
  creditLabel: {
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  creditValue: {
    fontSize: '32px',
    fontWeight: '800'
  },
  adjustmentBox: {
    padding: '14px',
    background: 'rgba(132,204,22,0.05)',
    borderRadius: '8px',
    marginBottom: '16px',
    border: '1px solid rgba(132,204,22,0.15)'
  },
  adjustmentTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '10px'
  },
  adjustmentRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#475569',
    marginBottom: '6px'
  },
  finalCredit: {
    padding: '20px',
    background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
    borderRadius: '12px',
    marginBottom: '16px',
    textAlign: 'center'
  },
  finalLabel: {
    fontSize: '12px',
    color: '#064e3b',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '600'
  },
  finalValue: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#064e3b'
  },
  permanenceBox: {
    padding: '14px',
    background: 'rgba(132,204,22,0.05)',
    borderRadius: '8px',
    marginBottom: '12px',
    border: '1px solid rgba(132,204,22,0.15)'
  },
  permanenceLabel: {
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '6px'
  },
  permanenceValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '8px'
  },
  permanenceBar: {
    width: '100%',
    height: '8px',
    background: 'rgba(0,0,0,0.1)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  permanenceFill: {
    height: '100%',
    transition: 'width 0.3s ease'
  },
  confidenceBadge: {
    padding: '12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    textAlign: 'center',
    color: '#0F172A'
  },
  qualityScore: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    padding: '14px',
    background: 'rgba(132,204,22,0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(132,204,22,0.15)'
  },
  qualityLabel: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#0F172A'
  },
  qualityBadge: {
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#ffffff'
  },
  similarityBox: {
    padding: '14px',
    background: 'rgba(132,204,22,0.05)',
    borderRadius: '8px',
    marginBottom: '16px',
    border: '1px solid rgba(132,204,22,0.15)'
  },
  similarityLabel: {
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '6px'
  },
  similarityValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '8px'
  },
  similarityBar: {
    width: '100%',
    height: '8px',
    background: 'rgba(0,0,0,0.1)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  similarityFill: {
    height: '100%',
    transition: 'width 0.3s ease'
  },
  forestComparison: {
    padding: '14px',
    background: 'rgba(132,204,22,0.05)',
    borderRadius: '8px',
    marginBottom: '12px',
    border: '1px solid rgba(132,204,22,0.15)'
  },
  forestItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#475569',
    marginBottom: '8px'
  },
  qualityNote: {
    padding: '12px',
    background: 'rgba(59,130,246,0.1)',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#0F172A',
    lineHeight: '1.5',
    border: '1px solid rgba(59,130,246,0.2)'
  },
  knnBadge: {
    padding: '14px',
    background: 'linear-gradient(135deg, rgba(132,204,22,0.15), rgba(132,204,22,0.05))',
    borderRadius: '10px',
    marginBottom: '16px',
    border: '1px solid rgba(132,204,22,0.3)',
    fontSize: '13px',
    fontWeight: '600',
    color: '#0F172A'
  },
  knnDetails: {
    display: 'flex',
    gap: '16px',
    marginTop: '8px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#475569'
  }
};
