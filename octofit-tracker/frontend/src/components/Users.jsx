import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api';

// Codespaces API pattern: -8000.app.github.dev/api/users

function formatDate(value) {
  if (!value) {
    return '—';
  }

  return new Date(value).toLocaleString();
}

export default function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const response = await fetch(getApiBaseUrl('users'));

        if (!response.ok) {
          throw new Error('Unable to load users.');
        }

        const payload = await response.json();

        if (isMounted) {
          setItems(normalizeCollection(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unexpected error while loading users.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2 className="h4 mb-1">Users</h2>
          <p className="text-muted mb-0">Members participating in OctoFit Tracker.</p>
        </div>
      </div>

      {loading && <div className="alert alert-light">Loading users…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id || item.id || index}>
                  <td>{item.name || '—'}</td>
                  <td>{item.email || '—'}</td>
                  <td>{item.teamId || '—'}</td>
                  <td>{formatDate(item.joinedAt || item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
