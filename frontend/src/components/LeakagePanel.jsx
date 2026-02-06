export default function LeakagePanel({ leakageData }) {
  if (!leakageData) return null;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'HIGH': return '#dc2626';
      case 'MEDIUM': return '#f59e0b';
      case 'LOW': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 'bold', color: '#0F172A' }}>
        Leakage Analysis
      </h3>

      {/* Status Badge */}
      <div style={{
        padding: '12px',
        background: leakageData.leakage_detected ? 'rgba(220,38,38,0.1)' : 'rgba(132,204,22,0.1)',
        borderRadius: '8px',
        marginBottom: '15px',
        border: `1px solid ${leakageData.leakage_detected ? 'rgba(220,38,38,0.3)' : 'rgba(132,204,22,0.3)'}`
      }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: leakageData.leakage_detected ? '#dc2626' : '#84cc16' }}>
          {leakageData.leakage_detected ? 'LEAKAGE DETECTED' : 'NO LEAKAGE'}
        </div>
        {leakageData.leakage_detected && (
          <div style={{ fontSize: '12px', color: getSeverityColor(leakageData.leakage_severity), marginTop: '5px' }}>
            Severity: {leakageData.leakage_severity} | Ratio: {leakageData.leakage_ratio}x
          </div>
        )}
      </div>

      {/* Summary */}
      <div style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '15px', color: '#475569' }}>
        {leakageData.summary}
      </div>

      {/* Comparison Table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
        {/* Project Area */}
        <div style={{ padding: '12px', background: 'rgba(132,204,22,0.05)', borderRadius: '8px', border: '1px solid rgba(132,204,22,0.2)' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#84cc16' }}>
            Project Area
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>
            <div>Area: {leakageData.project_area.area_km2} km²</div>
            <div>Baseline: {leakageData.project_area.baseline_forest_pct}% forest</div>
            <div>Current: {leakageData.project_area.current_forest_pct}% forest</div>
            <div style={{ color: '#dc2626', fontWeight: 'bold', marginTop: '5px' }}>
              Loss: {leakageData.project_area.deforestation_pct}%
            </div>
          </div>
        </div>

        {/* Buffer Zone */}
        <div style={{ padding: '12px', background: 'rgba(132,204,22,0.05)', borderRadius: '8px', border: '1px solid rgba(132,204,22,0.2)' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#65a30d' }}>
            Buffer Zone ({leakageData.buffer_km}km)
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>
            <div>Area: {leakageData.buffer_zone.area_km2} km²</div>
            <div>Baseline: {leakageData.buffer_zone.baseline_forest_pct}% forest</div>
            <div>Current: {leakageData.buffer_zone.current_forest_pct}% forest</div>
            <div style={{ color: '#dc2626', fontWeight: 'bold', marginTop: '5px' }}>
              Loss: {leakageData.buffer_zone.deforestation_pct}%
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div style={{
        padding: '12px',
        background: 'rgba(132,204,22,0.1)',
        borderRadius: '8px',
        fontSize: '12px',
        color: '#0F172A',
        border: '1px solid rgba(132,204,22,0.3)'
      }}>
        <strong>Recommendation:</strong> {leakageData.recommendation}
      </div>
    </div>
  );
}
