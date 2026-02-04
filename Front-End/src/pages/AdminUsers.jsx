import React, { useEffect, useState, useContext } from 'react';
import userService from '../services/userService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminUsers() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
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

  async function handleSave() {
    if (!editingUser) return;
    try {
      await userService.update(token, editingUser.id ?? editingUser.Id, editingUser);
      setEditingUser(null);
      await load();
    } catch (err) {
      alert(err.message || 'Update failed');
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
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id ?? u.Id}>
              <td>{u.id ?? u.Id}</td>
              <td>{u.username ?? u.Username}</td>
              <td>{u.email ?? u.Email}</td>
              <td>{u.role ?? u.Role}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => setEditingUser({ id: u.id ?? u.Id, username: u.username ?? u.Username, email: u.email ?? u.Email, role: u.role ?? u.Role })}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id ?? u.Id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="card p-3">
          <h5>Edit User</h5>
          <div className="mb-2">
            <label className="form-label">Username</label>
            <input className="form-control" value={editingUser.username} onChange={e => setEditingUser(prev => ({ ...prev, username: e.target.value }))} />
          </div>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input className="form-control" value={editingUser.email} onChange={e => setEditingUser(prev => ({ ...prev, email: e.target.value }))} />
          </div>
          <div className="mb-2">
            <label className="form-label">Role</label>
            <select className="form-control" value={editingUser.role} onChange={e => setEditingUser(prev => ({ ...prev, role: e.target.value }))}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
