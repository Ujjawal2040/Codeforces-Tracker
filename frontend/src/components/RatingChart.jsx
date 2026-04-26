import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const RatingChart = ({ ratingHistory }) => {
  if (!ratingHistory || ratingHistory.length === 0) return null;

  const data = ratingHistory.map(item => ({
    name: item.contestName,
    rating: item.newRating,
    change: item.newRating - item.oldRating,
    date: new Date(item.ratingUpdateTimeSeconds * 1000).toLocaleDateString()
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card" style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)' }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{payload[0].payload.name}</p>
          <p style={{ margin: 0, color: 'var(--accent-color)' }}>Rating: {payload[0].value}</p>
          <p style={{ margin: 0, color: payload[0].payload.change >= 0 ? 'var(--success)' : 'var(--danger)' }}>
            Change: {payload[0].payload.change >= 0 ? `+${payload[0].payload.change}` : payload[0].payload.change}
          </p>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{payload[0].payload.date}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card fade-in" style={{ marginTop: '2rem', padding: '1.5rem' }}>
      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        Rating History
      </h3>
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="var(--text-secondary)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              minTickGap={30}
            />
            <YAxis 
              stroke="var(--text-secondary)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="rating" 
              stroke="var(--accent-color)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRating)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RatingChart;
