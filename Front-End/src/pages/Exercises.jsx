import React, { useEffect, useState, useContext } from 'react';
import exerciseService from '../services/exerciseService';
import { AuthContext } from '../context/AuthContext';

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    load();
  }, [token]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await exerciseService.getAll(token);
      setExercises(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      if (editingId == null) {
        await exerciseService.add(token, formData);
      } else {
        await exerciseService.update(token, editingId, formData);
      }
      setFormData({ name: '', description: '' });
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err.message || 'Save failed');
    }
  }

  function handleEdit(ex) {
    setFormData({ name: ex.name || ex.Name || ex.ExerciseName, description: ex.description || ex.Description || ex.ExerciseDesc });
    setEditingId(ex.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this exercise?')) return;
    try {
      await exerciseService.delete(token, id);
      await load();
    } catch (err) {
      setError(err.message || 'Delete failed');
    }
  }

  function handleCancel() {
    setFormData({ name: '', description: '' });
    setEditingId(null);
  }

  return (
    <div>
      {user?.role === 'Admin' && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{editingId ? 'Edit Exercise' : 'Add New Exercise'}</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input name="name" value={formData.name} onChange={onChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="description" value={formData.description} onChange={onChange} className="form-control" />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div>
                <button type="submit" className={`btn btn-primary me-2`}>
                  {editingId ? 'Update Exercise' : 'Save Exercise'}
                </button>
                {editingId && (
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Exercises</h5>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    {user?.role === 'Admin' && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {exercises.map((ex) => (
                    <tr key={ex.id}>
                      <td>{ex.name}</td>
                      <td>{ex.description}</td>
                      {user?.role === 'Admin' && (
                        <td>
                          <button className="btn btn-sm btn-secondary me-2" onClick={() => handleEdit(ex)}>
                            Edit
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(ex.id)}>
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
