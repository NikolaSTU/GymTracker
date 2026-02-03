import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    const result = await register(username, email, password);
    if (!result.success) {
      setError(result.message || 'Registration failed');
      return;
    }

    navigate('/dashboard');
  }

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: 420 }}>
        <div className="card-body">
          <h3 className="card-title mb-3">Register</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input value={username} onChange={e => setUsername(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} className="form-control" />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-primary" type="submit">Register</button>
          </form>
          <div className="mt-3">
            <small>
              Already have an account? <Link to="/">Login here</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
