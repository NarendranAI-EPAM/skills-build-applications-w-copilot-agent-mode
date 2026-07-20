import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

// Codespaces endpoint example: -8000.app.github.dev/api/leaderboard

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(getApiUrl('leaderboard'));
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? [];
        setEntries(data);
      } catch (err) {
        setError('Unable to load leaderboard.');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) return <div className="p-3">Loading leaderboard…</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Leaderboard</h2>
        <ul className="list-group list-group-flush">
          {entries.map((entry) => (
            <li key={entry._id || entry.id || entry.name} className="list-group-item">
              <strong>{entry.name}</strong> — {entry.score} pts
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
