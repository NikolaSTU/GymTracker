import React, { useEffect, useState, useContext } from 'react';
import workoutService from '../services/workoutService';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function MyWorkouts() {
  const { user, token, activeWorkoutId, clearActiveWorkout } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    load();
  }, [user]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await workoutService.getHistory(token, user.id ?? user.Id);
      setWorkouts(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>My Workout History</h3>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {workouts.length === 0 && !loading && <div>No workouts found. Start one!</div>}

      <div className="row">
        {workouts.map(w => (
          <div className="col-md-4 mb-3" key={w.id ?? w.Id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{w.name ?? `Workout #${w.id ?? w.Id}`}</h5>
                <p className="card-text">{new Date(w.date ?? w.Date).toLocaleDateString()}</p>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-primary" onClick={() => navigate(`/workout/history/${w.id ?? w.Id}`)}>View Details</button>
                  <button className="btn btn-sm btn-danger" onClick={async () => {
                    if (!window.confirm('Delete this workout?')) return;
                    try {
                      await workoutService.delete(token, w.id ?? w.Id);
                      setWorkouts(prev => prev.filter(x => (x.id ?? x.Id) !== (w.id ?? w.Id)));
                      if (String(activeWorkoutId) === String(w.id ?? w.Id)) {
                        try { clearActiveWorkout(); } catch {}
                      }
                    } catch (err) {
                      alert(err.message || 'Failed to delete workout');
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
