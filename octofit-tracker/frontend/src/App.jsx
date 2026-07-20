import { Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
      <p className="lead">A modern multi-tier fitness tracking experience.</p>
      <Link to="/" className="btn btn-primary">Go to dashboard</Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
