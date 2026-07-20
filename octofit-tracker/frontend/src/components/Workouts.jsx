import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(getApiUrl('workouts'));
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? [];
        setWorkouts(data);
      } catch (err) {
        setError('Unable to load workouts.');
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) return <div className="p-3">Loading workouts…</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Workouts</h2>
        <ul className="list-group list-group-flush">
          {workouts.map((workout) => (
            <li key={workout._id || workout.id || workout.title} className="list-group-item">
              <strong>{workout.title}</strong> — {workout.difficulty} • {workout.duration} min
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
