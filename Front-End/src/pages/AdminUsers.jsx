import React, { useEffect, useState, useContext } from 'react';
import userService from '../services/userService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminUsers() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (user.role !== 'Admin') {
      navigate('/dashboard');
      return;
    }
    load();
  }, [user]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAll(token);
      setUsers(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this user?')) return;
    try {
      await userService.delete(token, id);
      setUsers(prev => prev.filter(u => (u.id ?? u.Id) !== id));
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  }

  

  return (
    <div>
      <h3>Manage Users</h3>
      {loading && <div>Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Weight (kg)</th>
            <th>Height (cm)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id ?? u.Id}>
              <td>{u.id ?? u.Id}</td>
              <td>{u.username ?? u.Username}</td>
              <td>{u.email ?? u.Email}</td>
              <td>{u.firstName ?? u.FirstName}</td>
              <td>{u.lastName ?? u.LastName}</td>
              <td>{(u.weight ?? u.Weight) ?? ''}</td>
              <td>{(u.height ?? u.Height) ?? ''}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id ?? u.Id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
