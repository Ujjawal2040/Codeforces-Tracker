import React from 'react';

const StatsCard = ({ label, value, color }) => {
  return (
    <div className="glass-card stat-item">
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={{ color: color || 'var(--text-primary)' }}>
        {value}
      </div>
    </div>
  );
};

export default StatsCard;
