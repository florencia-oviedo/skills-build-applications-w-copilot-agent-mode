import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api';

// Codespaces API pattern: -8000.app.github.dev/api/activities

function formatDate(value) {
  if (!value) {
    return '—';
  }

  return new Date(value).toLocaleString();
}

export default function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadActivities() {
      try {
        const response = await fetch(getApiBaseUrl('activities'));

        if (!response.ok) {
          throw new Error('Unable to load activities.');
        }

        const payload = await response.json();

        if (isMounted) {
          setItems(normalizeCollection(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unexpected error while loading activities.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2 className="h4 mb-1">Activities</h2>
          <p className="text-muted mb-0">Recent activity entries from the backend.</p>
        </div>
      </div>

      {loading && <div className="alert alert-light">Loading activities…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id || item.id || index}>
                  <td>{item.type || '—'}</td>
                  <td>{item.durationMinutes ?? '—'} min</td>
                  <td>{item.caloriesBurned ?? '—'}</td>
                  <td>{formatDate(item.activityDate || item.createdAt)}</td>
                  <td>{item.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
