import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api';

// Codespaces API pattern: -8000.app.github.dev/api/workouts

function formatDate(value) {
  if (!value) {
    return '—';
  }

  return new Date(value).toLocaleString();
}

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadWorkouts() {
      try {
        const response = await fetch(getApiBaseUrl('workouts'));

        if (!response.ok) {
          throw new Error('Unable to load workouts.');
        }

        const payload = await response.json();

        if (isMounted) {
          setItems(normalizeCollection(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unexpected error while loading workouts.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2 className="h4 mb-1">Workouts</h2>
          <p className="text-muted mb-0">Suggested workouts for the community.</p>
        </div>
      </div>

      {loading && <div className="alert alert-light">Loading workouts…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Duration</th>
                <th>Intensity</th>
                <th>Exercises</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id || item.id || index}>
                  <td>{item.name || '—'}</td>
                  <td>{item.durationMinutes ?? '—'} min</td>
                  <td>{item.intensity || '—'}</td>
                  <td>{Array.isArray(item.exercises) ? item.exercises.join(', ') : '—'}</td>
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
