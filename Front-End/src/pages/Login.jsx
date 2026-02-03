import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const result = await login(username, password);
    if (!result.success) {
      if (result.message && result.message.toLowerCase().includes('invalid')) {
        alert('Invalid Password');
      } else {
        setError(result.message || 'Login failed');
      }
      return;
    }

    navigate('/dashboard');
  }

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
      <div className="mt-3">
        <small>
          Need an account? <a href="/register">Register here</a>
        </small>
      </div>
    </div>
  );
}
