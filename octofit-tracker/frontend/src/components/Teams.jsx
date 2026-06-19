import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api';

// Codespaces API pattern: -8000.app.github.dev/api/teams

function formatDate(value) {
  if (!value) {
    return '—';
  }

  return new Date(value).toLocaleString();
}

export default function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadTeams() {
      try {
        const response = await fetch(getApiBaseUrl('teams'));

        if (!response.ok) {
          throw new Error('Unable to load teams.');
        }

        const payload = await response.json();

        if (isMounted) {
          setItems(normalizeCollection(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unexpected error while loading teams.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2 className="h4 mb-1">Teams</h2>
          <p className="text-muted mb-0">Collaborative groups in OctoFit Tracker.</p>
        </div>
      </div>

      {loading && <div className="alert alert-light">Loading teams…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id || item.id || index}>
                  <td>{item.name || '—'}</td>
                  <td>{item.description || '—'}</td>
                  <td>{Array.isArray(item.memberIds) ? item.memberIds.length : '—'}</td>
                  <td>{formatDate(item.createdAt || item.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
