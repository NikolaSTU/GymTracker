import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import workoutService from '../services/workoutService';
import { AuthContext } from '../context/AuthContext';

export default function WorkoutDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const w = await workoutService.getById(token, id);
        setWorkout(w);
      } catch (err) {
        setError(err.message || 'Failed to load workout');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!workout) return <div>No workout found</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3>{workout.name ?? `Workout #${workout.id ?? workout.Id}`}</h3>
          <div>{new Date(workout.date ?? workout.Date).toLocaleString()}</div>
        </div>
        <div>
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Back to History</button>
        </div>
      </div>

      <div>
        {(workout.exercises || workout.Exercises || []).map((ex) => (
          <div className="card mb-3" key={ex.id ?? ex.Id}>
            <div className="card-body">
              <h5>{ex.exerciseName ?? ex.ExerciseName}</h5>
              <div className="table-responsive mt-2">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Reps</th>
                      <th>Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(ex.sets || ex.Sets || []).map((s, idx) => (
                      <tr key={s.id ?? s.Id ?? idx}>
                        <td>{idx + 1}</td>
                        <td>{s.reps ?? s.Reps}</td>
                        <td>{s.weight ?? s.Weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
