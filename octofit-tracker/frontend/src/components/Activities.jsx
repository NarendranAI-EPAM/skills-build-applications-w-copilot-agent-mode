import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(getApiUrl('activities'));
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? [];
        setActivities(data);
      } catch (err) {
        setError('Unable to load activities.');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) return <div className="p-3">Loading activities…</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Activities</h2>
        <ul className="list-group list-group-flush">
          {activities.map((activity) => (
            <li key={activity._id || activity.id || activity.type} className="list-group-item">
              <strong>{activity.type}</strong> — {activity.duration} min • {activity.calories} kcal
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
