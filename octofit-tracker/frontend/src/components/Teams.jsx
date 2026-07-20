import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

// Codespaces endpoint example: -8000.app.github.dev/api/teams

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(getApiUrl('teams'));
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? [];
        setTeams(data);
      } catch (err) {
        setError('Unable to load teams.');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) return <div className="p-3">Loading teams…</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Teams</h2>
        <ul className="list-group list-group-flush">
          {teams.map((team) => (
            <li key={team._id || team.id || team.name} className="list-group-item">
              <strong>{team.name}</strong> — {team.members} members{team.captain ? ` • Captain: ${team.captain}` : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
