import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const links = [
  ['/', 'Dashboard'],
  ['/users', 'Users'],
  ['/teams', 'Teams'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/workouts', 'Workouts'],
]

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>OctoFit Tracker</h1>
      <p className="lead">Track progress, connect with your team, and keep moving.</p>
      <div className="row g-4 mt-3">
        {links.slice(1).map(([path, label]) => (
          <div className="col-sm-6 col-lg-3" key={path}>
            <NavLink className="card dashboard-card h-100 text-decoration-none" to={path}>
              <div className="card-body">
                <h2 className="h5">{label}</h2>
                <span className="text-secondary">View {label.toLowerCase()}</span>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">OctoFit Tracker</NavLink>
          <nav className="navbar-nav flex-row flex-wrap gap-2" aria-label="Main navigation">
            {links.map(([path, label]) => (
              <NavLink
                className={({ isActive }) => `nav-link px-2 ${isActive ? 'active' : ''}`}
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
