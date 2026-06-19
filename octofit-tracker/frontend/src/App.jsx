import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navigation = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand fw-semibold" href="/">
            OctoFit Tracker
          </a>
          <div className="navbar-nav flex-wrap gap-2">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <span className="navbar-text text-light ms-lg-3">
            {codespaceName ? `Codespace: ${codespaceName}` : 'Local fallback API'}
          </span>
        </div>
      </nav>

      <main className="container py-4">
        <div className="alert alert-info mb-4">
          Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> to use the Codespaces API URL pattern.
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
