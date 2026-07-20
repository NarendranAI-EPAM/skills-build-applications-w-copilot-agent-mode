import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(getApiUrl('users'));
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? [];
        setUsers(data);
      } catch (err) {
        setError('Unable to load users.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return <div className="p-3">Loading users…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Users</h2>
        <ul className="list-group list-group-flush">
          {users.map((user) => (
            <li key={user._id || user.id || user.email} className="list-group-item">
              <strong>{user.name}</strong> — {user.email} ({user.role})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
