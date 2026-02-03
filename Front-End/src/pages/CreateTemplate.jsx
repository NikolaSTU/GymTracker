import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import templateService from '../services/templateService';
import exerciseService from '../services/exerciseService';
import { AuthContext } from '../context/AuthContext';

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function CreateTemplate() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [availableExercises, setAvailableExercises] = useState([]);
  const [addedExercises, setAddedExercises] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();
  const editId = params.id;

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const ex = await exerciseService.getAll(token);
        setAvailableExercises(ex);
        if (ex.length) setSelectedExerciseId(ex[0].id);

        if (editId) {
          // load template for edit
          const tpl = await templateService.getById(token, editId);
          setName(tpl.name || '');
          setDescription(tpl.description || '');
          const mapped = (tpl.exercises || []).map(e => ({
            uniqueId: uid(),
            exerciseId: e.exerciseId,
            name: e.exerciseName || (ex.find(a => String(a.id) === String(e.exerciseId))?.name) || e.exerciseName || '',
            sets: (e.sets || []).map(s => ({ uniqueId: uid(), targetReps: s.targetReps || 0, targetWeight: s.targetWeight || 0 }))
          }));
          setAddedExercises(mapped);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchExercises();
  }, [token]);

  function addExercise() {
    if (!selectedExerciseId) return;
    const found = availableExercises.find(x => String(x.id) === String(selectedExerciseId));
    if (!found) return;
    setAddedExercises(prev => [...prev, {
      uniqueId: uid(),
      exerciseId: found.id,
      name: found.name,
      sets: [{ uniqueId: uid(), targetReps: 0, targetWeight: 0 }]
    }]);
  }

  function removeExercise(uniqueId) {
    setAddedExercises(prev => prev.filter(x => x.uniqueId !== uniqueId));
  }

  function addSet(exUniqueId) {
    setAddedExercises(prev => prev.map(e => e.uniqueId === exUniqueId ? ({ ...e, sets: [...e.sets, { uniqueId: uid(), targetReps: 0, targetWeight: 0 }] }) : e));
  }

  function removeSet(exUniqueId, setUniqueId) {
    setAddedExercises(prev => prev.map(e => e.uniqueId === exUniqueId ? ({ ...e, sets: e.sets.filter(s => s.uniqueId !== setUniqueId) }) : e));
  }

  function updateSet(exUniqueId, setUniqueId, field, value) {
    setAddedExercises(prev => prev.map(e => {
      if (e.uniqueId !== exUniqueId) return e;
      return { ...e, sets: e.sets.map(s => s.uniqueId === setUniqueId ? ({ ...s, [field]: value }) : s) };
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // transform into API expected shape
    const payload = {
      name,
      description,
      exercises: addedExercises.map(ex => ({
        exerciseId: parseInt(ex.exerciseId, 10) || 0,
        workoutTemplateId: 0,
        sets: ex.sets.map(s => ({
          targetReps: parseInt(s.targetReps, 10) || 0,
          targetWeight: parseFloat(s.targetWeight) || 0,
          templateExerciseId: 0
        }))
      }))
    };

    try {
      if (editId) {
        await templateService.update(token, editId, payload);
      } else {
        await templateService.create(token, payload);
      }
      navigate('/templates');
    } catch (err) {
      setError(err.message || 'Failed to save');
    }
  }

  return (
    <div>
      <h3>{editId ? 'Edit Template' : 'Create Template'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        <div className="d-flex gap-2 align-items-center mb-3">
          <select className="form-control" value={selectedExerciseId} onChange={e => setSelectedExerciseId(e.target.value)}>
            {availableExercises.map(ex => (
              <option key={ex.id} value={ex.id}>{ex.name}</option>
            ))}
          </select>
          <button type="button" className="btn btn-secondary" onClick={addExercise}>Add Exercise</button>
        </div>

        {addedExercises.map(ex => (
          <div className="card mb-3" key={ex.uniqueId}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5>{ex.name}</h5>
                <button type="button" className="btn btn-sm btn-danger" onClick={() => removeExercise(ex.uniqueId)}>Remove Exercise</button>
              </div>

              <div className="table-responsive mt-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Set #</th>
                      <th>Target Reps</th>
                      <th>Target Weight</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ex.sets.map((s, idx) => (
                      <tr key={s.uniqueId}>
                        <td>{idx + 1}</td>
                        <td><input type="number" className="form-control" value={s.targetReps} onChange={e => updateSet(ex.uniqueId, s.uniqueId, 'targetReps', e.target.value)} /></td>
                        <td><input type="number" step="0.1" className="form-control" value={s.targetWeight} onChange={e => updateSet(ex.uniqueId, s.uniqueId, 'targetWeight', e.target.value)} /></td>
                        <td>
                          <button type="button" className="btn btn-sm btn-danger me-2" onClick={() => removeSet(ex.uniqueId, s.uniqueId)}>Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <button type="button" className="btn btn-sm btn-secondary me-2" onClick={() => addSet(ex.uniqueId)}>Add Set</button>
              </div>
            </div>
          </div>
        ))}

        {error && <div className="alert alert-danger">{error}</div>}
        <div>
          <button className="btn btn-primary" type="submit">Save Template</button>
        </div>
      </form>
    </div>
  );
}
