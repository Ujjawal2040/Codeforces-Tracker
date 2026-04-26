import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Award, Activity, Loader2 } from 'lucide-react';
import { fetchUserData, fetchRecentSearches } from './api';
import StatsCard from './components/StatsCard';
import ContestTable from './components/ContestTable';

function App() {
  const [handle, setHandle] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    const history = await fetchRecentSearches();
    setRecentSearches(history);
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!handle) return;

    setLoading(true);
    setError('');
    setData(null);

    try {
      const result = await fetchUserData(handle);
      setData(result);
      loadRecentSearches();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const selectRecent = (h) => {
    setHandle(h);
    // Trigger search after state update
    setTimeout(() => document.getElementById('search-form').requestSubmit(), 0);
  };

  return (
    <div className="app-container">
      <h1>Codeforces Tracker</h1>

      <form id="search-form" className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Enter Codeforces Handle (e.g. tourist)"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
        </button>
      </form>

      {recentSearches.length > 0 && !data && !loading && (
        <div className="fade-in" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Recent Searches:</p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {recentSearches.map((s) => (
              <span
                key={s.handle}
                className="glass-card"
                style={{ padding: '0.4rem 1rem', cursor: 'pointer', fontSize: '0.875rem' }}
                onClick={() => selectRecent(s.handle)}
              >
                {s.handle}
              </span>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="glass-card fade-in" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {data && (
        <div className="fade-in">
          <div className="profile-header glass-card">
            <img 
              src={data.user.titlePhoto} 
              alt={data.user.handle} 
              className="profile-avatar"
              onError={(e) => e.target.src = 'https://codeforces.org/s/29571/images/codeforces-logo-with-telegram.png'}
            />
            <div className="profile-info">
              <h2>{data.user.handle}</h2>
              <p>{data.user.rank ? data.user.rank.charAt(0).toUpperCase() + data.user.rank.slice(1) : 'Unrated'}</p>
              <p>{data.user.organization || 'No Organization'}</p>
            </div>
          </div>

          <div className="stats-grid">
            <StatsCard 
              label="Current Rating" 
              value={data.user.rating || 0} 
              color="var(--accent-color)" 
            />
            <StatsCard 
              label="Max Rating" 
              value={data.user.maxRating || 0} 
              color="var(--success)" 
            />
            <StatsCard 
              label="Contribution" 
              value={data.user.contribution || 0} 
              color={data.user.contribution >= 0 ? 'var(--success)' : 'var(--danger)'}
            />
            <StatsCard 
              label="Friend Of" 
              value={data.user.friendOfCount || 0} 
            />
          </div>

          <ContestTable ratingHistory={data.ratingHistory} />
        </div>
      )}

      {!data && !loading && !error && (
        <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-secondary)' }}>
          <Activity size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <p>Search for a handle to see their performance stats</p>
        </div>
      )}
    </div>
  );
}

export default App;
