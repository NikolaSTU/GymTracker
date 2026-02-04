import React, { useEffect, useState, useContext } from 'react';
import templateService from '../services/templateService';
import workoutService from '../services/workoutService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, setActiveWorkout, activeWorkoutId, clearActiveWorkout } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, [token]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await templateService.getAll(token);
      setTemplates(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load templates');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>My Templates</h3>
        <Link to="/templates/create" className="btn btn-primary">Create New Template</Link>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {templates.map((t) => (
          <div className="col-md-4 mb-3" key={t.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{t.name}</h5>
                <p className="card-text">{t.description}</p>
                <ul>
                  {(t.exercises || []).map((ex) => (
                    <li key={ex.id}>{ex.exerciseName || ex.exerciseName || 'Exercise'} - {(ex.sets || []).length} Sets</li>
                  ))}
                </ul>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <small className="text-muted">{(t.exercises || []).length} Exercises</small>
                <div>
                  <button className="btn btn-sm btn-primary me-2" onClick={async () => {
                    if (activeWorkoutId) {
                      alert('Please finish or delete your current active workout before starting a new one.');
                      return;
                    }
                    try {
                      const created = await workoutService.startFromTemplate(token, t.id);
                      const newId = created?.id ?? created?.Id;
                      if (newId) {
                        setActiveWorkout(newId);
                        navigate(`/workout/active/${newId}`);
                      }
                    } catch (err) {
                      alert(err.message || 'Failed to start workout');
                    }
                  }}>Start Workout</button>
                  <Link to={`/templates/edit/${t.id}`} className="btn btn-sm btn-secondary me-2">Edit</Link>
                  <button className="btn btn-sm btn-danger" onClick={async () => {
                    if (!window.confirm('Delete this template?')) return;
                    try {
                      await templateService.delete(token, t.id);
                      setTemplates(prev => prev.filter(x => x.id !== t.id));
                    } catch (err) {
                      alert(err.message || 'Delete failed');
                    }
                  }}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
