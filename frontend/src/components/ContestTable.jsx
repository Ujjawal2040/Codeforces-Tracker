import React from 'react';

const ContestTable = ({ ratingHistory }) => {
  if (!ratingHistory || ratingHistory.length === 0) {
    return <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No contest history found.</p>;
  }

  return (
    <div className="glass-card fade-in" style={{ marginTop: '2rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Contest Performance</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Contest Name</th>
              <th>Rank</th>
              <th>Rating Change</th>
              <th>New Rating</th>
            </tr>
          </thead>
          <tbody>
            {[...ratingHistory].reverse().map((contest, index) => {
              const diff = contest.newRating - contest.oldRating;
              return (
                <tr key={contest.contestId}>
                  <td>{ratingHistory.length - index}</td>
                  <td style={{ maxWidth: '400px' }}>{contest.contestName}</td>
                  <td>{contest.rank}</td>
                  <td className={diff >= 0 ? 'rating-up' : 'rating-down'}>
                    {diff >= 0 ? `+${diff}` : diff}
                  </td>
                  <td style={{ fontWeight: 600 }}>{contest.newRating}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContestTable;
