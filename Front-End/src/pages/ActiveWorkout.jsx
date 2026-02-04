import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import workoutService from '../services/workoutService';
import exerciseService from '../services/exerciseService';
import workoutExerciseService from '../services/workoutExerciseService';
import setEntryService from '../services/setEntryService';
import { useRef } from 'react';
import { AuthContext } from '../context/AuthContext';

function uid() { return Math.random().toString(36).slice(2,9); }

function normalizeWorkout(w) {
  if (!w) return null;
  const normalized = {
    id: w.id ?? w.Id,
    name: w.name ?? w.Name ?? '',
    date: w.date ?? w.Date,
    exercises: (w.exercises || w.Exercises || []).map(ex => ({
      id: ex.id ?? ex.Id,
      exerciseId: ex.exerciseId ?? ex.ExerciseId,
      exerciseName: ex.exerciseName ?? ex.ExerciseName ?? ex.name ?? ex.Name ?? '',
      sets: (ex.sets || ex.Sets || []).map(s => ({
        id: s.id ?? s.Id,
        reps: s.reps ?? s.Reps ?? 1,
        weight: s.weight ?? s.Weight ?? 0,
        uniqueId: uid()
      })),
    })),
  };
  return normalized;
}

export default function ActiveWorkout(){
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, clearActiveWorkout } = useContext(AuthContext);

  const [workout, setWorkout] = useState(null);
  const [availableExercises, setAvailableExercises] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingCount, setSavingCount] = useState(0);
  const saveTimers = useRef({});
  const nameSaveTimer = useRef(null);

  const DRAFT_KEY = `activeWorkout:${id}`;

  useEffect(() => {
    if (!id) {
      setError('Workout id is required');
      setLoading(false);
      return;
    }
    (async ()=>{
      try {
        // load exercises for picker
        const exList = await exerciseService.getAll(token);
        setAvailableExercises(exList || []);
        if (exList && exList.length) setSelectedExerciseId(exList[0].id);

        const w = await workoutService.getById(token, id);
        setWorkout(normalizeWorkout(w));
        // restore draft if exists and merge simply (draft wins)
        try {
          const raw = localStorage.getItem(DRAFT_KEY);
          if (raw) {
            const draft = JSON.parse(raw);
            if (draft && draft.exercises) {
              setWorkout(prev => ({ ...prev, ...draft }));
            }
          }
        } catch {}
      } catch (e) {
        setError(e.message || 'Failed to load workout');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token]);

  // save draft whenever workout changes (debounced)
  useEffect(() => {
    if (!workout) return;
    const t = setTimeout(() => {
      try { localStorage.setItem(DRAFT_KEY, JSON.stringify(workout)); } catch {}
    }, 700);
    return () => clearTimeout(t);
  }, [workout]);

  function handleNameChange(e) {
    const v = e.target.value;
    setWorkout(prev => ({ ...prev, name: v }));
  }

  function handleSetChange(exIndex, setIndex, field, value) {
    setWorkout(prev => {
      if (!prev) return prev;
      const next = { ...prev, exercises: prev.exercises.map(ex => ({ ...ex })) };
      const targetEx = next.exercises[exIndex];
      if (!targetEx) return prev;
      // copy sets
      targetEx.sets = (targetEx.sets || []).map(s => ({ ...s }));
      const targetSet = targetEx.sets[setIndex];
      if (!targetSet) return prev;
      if (field === 'reps') {
        const intVal = parseInt(value || 0, 10);
        targetSet.reps = Number.isNaN(intVal) ? 0 : intVal;
        targetSet.Reps = targetSet.reps;
      }
      if (field === 'weight') {
        const floatVal = parseFloat(value || 0);
        targetSet.weight = floatVal;
        targetSet.Weight = floatVal;
      }
      // autosave this set if it exists on server
      const setId = targetSet.id || targetSet.Id;
      if (setId && setId > 0) {
        // debounce per-set save
        const key = `set:${setId}`;
        if (saveTimers.current[key]) clearTimeout(saveTimers.current[key]);
        saveTimers.current[key] = setTimeout(async () => {
          try {
            setSavingCount(c => c + 1);
            const res = await setEntryService.update(token, setId, { Weight: targetSet.weight, Reps: Math.max(1, targetSet.reps), WorkoutExerciseId: targetEx.id });
            // reconcile server response into local state (keeps UI in sync)
            setWorkout(prev => {
              if (!prev) return prev;
              const next = { ...prev, exercises: prev.exercises.map(ex => ({ ...ex })) };
              const tgt = next.exercises.find(e => (e.id || e.Id) === (targetEx.id || targetEx.Id));
              if (!tgt) return prev;
              tgt.sets = (tgt.sets || []).map(s => {
                if ((s.id || s.Id) === (setId || setId)) {
                  return {
                    ...s,
                    id: res.id ?? res.Id,
                    reps: res.reps ?? res.Reps ?? Math.max(1, targetSet.reps),
                    weight: res.weight ?? res.Weight ?? targetSet.weight,
                  };
                }
                return s;
              });
              return next;
            });
          } catch (err) {
            console.warn('Failed to save set', err);
          } finally {
            setSavingCount(c => c - 1);
            delete saveTimers.current[key];
          }
        }, 600);
      }
      return next;
    });
  }

  function addSet(exIndex) {
    const ex = workout.exercises[exIndex];
    // if server-side exercise exists, create set on server
    if (ex && ex.id && ex.id > 0) {
      (async () => {
          try {
          setSavingCount(c => c + 1);
          // server requires at least 1 rep, send 1 to avoid validation errors
          const res = await setEntryService.create(token, { Weight: 0, Reps: 1, WorkoutExerciseId: ex.id });
          // update local state with new set id
          setWorkout(prev => {
            const next = { ...prev, exercises: prev.exercises.map(e => ({ ...e })) };
            const target = next.exercises[exIndex];
        target.sets = [...(target.sets || []), { id: res.id ?? res.Id, reps: res.reps ?? res.Reps ?? 1, weight: res.weight ?? res.Weight ?? 0, uniqueId: uid() }];
            return next;
          });
        } catch (err) {
          alert(err.message || 'Failed to add set');
        } finally {
          setSavingCount(c => c - 1);
        }
      })();
    } else {
      // local only
      setWorkout(prev => {
        const next = { ...prev, exercises: prev.exercises.map(ex => ({ ...ex })) };
        const targetEx = next.exercises[exIndex];
        targetEx.sets = [...(targetEx.sets || []), { id: 0, reps: 1, weight: 0, uniqueId: uid() }];
        // save draft
        try { localStorage.setItem(DRAFT_KEY, JSON.stringify(next)); } catch {}
        return next;
      });
    }
  }

  function removeSet(exIndex, setIndex) {
    const ex = workout.exercises[exIndex];
    const setObj = ex.sets[setIndex];
    if (setObj && setObj.id && setObj.id > 0) {
      (async () => {
        if (!window.confirm('Delete this set permanently?')) return;
        try {
          setSavingCount(c => c + 1);
          await setEntryService.delete(token, setObj.id);
          setWorkout(prev => {
            const next = { ...prev, exercises: prev.exercises.map(ex => ({ ...ex })) };
            const targetEx = next.exercises[exIndex];
            targetEx.sets = (targetEx.sets || []).filter((_, i) => i !== setIndex);
            return next;
          });
        } catch (err) {
          alert(err.message || 'Failed to delete set');
        } finally {
          setSavingCount(c => c - 1);
        }
      })();
    } else {
      setWorkout(prev => {
        const next = { ...prev, exercises: prev.exercises.map(ex => ({ ...ex })) };
        const targetEx = next.exercises[exIndex];
        targetEx.sets = (targetEx.sets || []).filter((_, i) => i !== setIndex);
        try { localStorage.setItem(DRAFT_KEY, JSON.stringify(next)); } catch {}
        return next;
      });
    }
  }

  async function addExercise() {
    // create workout exercise on server if possible
    try {
      setSavingCount(c => c + 1);
      // create with one default set to avoid server-side validation errors
      const res = await workoutExerciseService.create(token, workout.id, selectedExerciseId, [{ reps: 1, weight: 0 }]);
      // append returned exercise
      setWorkout(prev => {
        const next = { ...prev, exercises: [...(prev.exercises || [])] };
        const name = res.exerciseName ?? res.ExerciseName ?? availableExercises.find(a => String(a.id) === String(res.exerciseId ?? res.ExerciseId))?.name ?? 'Exercise';
        next.exercises.push({ id: res.id ?? res.Id, exerciseId: res.exerciseId ?? res.ExerciseId, exerciseName: name, sets: (res.sets || res.Sets || []).map(s => ({ id: s.id ?? s.Id, reps: s.reps ?? s.Reps ?? 1, weight: s.weight ?? s.Weight ?? 0, uniqueId: uid() })) });
        return next;
      });
    } catch (err) {
      alert(err.message || 'Failed to add exercise');
    } finally {
      setSavingCount(c => c - 1);
    }
  }

  function removeExercise(exIndex) {
    const ex = workout.exercises[exIndex];
    if (ex && ex.id && ex.id > 0) {
      (async () => {
        if (!window.confirm('Remove this exercise from workout and delete from server?')) return;
        try {
          setSavingCount(c => c + 1);
          await workoutExerciseService.delete(token, ex.id);
          setWorkout(prev => {
            const next = { ...prev, exercises: prev.exercises.map(ex => ({ ...ex })) };
            next.exercises = (next.exercises || []).filter((_, i) => i !== exIndex);
            return next;
          });
        } catch (err) {
          alert(err.message || 'Failed to remove exercise');
        } finally {
          setSavingCount(c => c - 1);
        }
      })();
    } else {
      setWorkout(prev => {
        if (!prev) return prev;
        const next = { ...prev, exercises: prev.exercises.map(ex => ({ ...ex })) };
        next.exercises = (next.exercises || []).filter((_, i) => i !== exIndex);
        return next;
      });
    }
  }

  async function handleFinish(){
    try{
      const payload = {
        id: workout.id,
        name: workout.name,
        date: workout.date,
        exercises: (workout.exercises || []).map(e => ({
          exerciseId: e.exerciseId || 0,
          sets: (e.sets || []).map(s => ({ reps: s.reps || 0, weight: s.weight || 0 }))
        }))
      };
      await workoutService.update(token, id, payload);
      // clear draft
      try { localStorage.removeItem(DRAFT_KEY); } catch (error) { console.error(error); }
      try { clearActiveWorkout(); } catch {}
      navigate('/dashboard');
    }catch(e){
      alert(e.message || 'Failed to save workout');
    }
  }

  async function handleDelete(){
    if(!window.confirm('Delete this workout?')) return;
    try{
      await workoutService.delete(token, id);
      try { localStorage.removeItem(DRAFT_KEY); } catch {}
      try { clearActiveWorkout(); } catch {}
      navigate('/dashboard');
    }catch(e){
      alert(e.message || 'Failed to delete workout');
    }
  }

  if(loading) return <div>Loading...</div>;
  if(error) return <div className="alert alert-danger">{error}</div>;
  if(!workout) return <div>No workout found</div>;

  return (
    <div>
      <div className="mb-3">
        <label className="form-label">Workout Name</label>
        <input className="form-control" value={workout.name || ''} onChange={handleNameChange} />
      </div>
      <p>Date: {new Date(workout.date || workout.Date).toLocaleString()}</p>

      <div className="d-flex gap-2 align-items-center mb-3">
        <select className="form-control" value={selectedExerciseId} onChange={e => setSelectedExerciseId(e.target.value)}>
          {availableExercises.map(ex => (
            <option key={ex.id} value={ex.id}>{ex.name}</option>
          ))}
        </select>
        <button className="btn btn-secondary" onClick={addExercise}>Add Exercise</button>
      </div>

      <div>
        {(workout.exercises || []).map((ex, exIdx)=> (
          <div key={ex.id || ex.exerciseId || exIdx} className="card mb-2">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="m-0">{ex.exerciseName}</h5>
                <div>
                  <button className="btn btn-sm btn-secondary me-2" onClick={()=> addSet(exIdx)}>Add Set</button>
                  <button className="btn btn-sm btn-danger" onClick={()=> {
                    if (!window.confirm('Remove this exercise from workout?')) return;
                    removeExercise(exIdx);
                  }}>Remove Exercise</button>
                </div>
              </div>

              <div className="table-responsive mt-2">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Reps</th>
                      <th>Weight</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(ex.sets || []).map((s, setIdx)=> (
                      <tr key={s.uniqueId || s.id || setIdx}>
                        <td>{setIdx + 1}</td>
                        <td>
                          <input type="number" className="form-control" value={s.reps} onChange={(e)=> handleSetChange(exIdx, setIdx, 'reps', e.target.value)} />
                        </td>
                        <td>
                          <input type="number" step="0.1" className="form-control" value={s.weight} onChange={(e)=> handleSetChange(exIdx, setIdx, 'weight', e.target.value)} />
                        </td>
                        <td>
                          <button className="btn btn-sm btn-danger" onClick={()=> removeSet(exIdx, setIdx)}>Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      

      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={handleFinish}>Finish</button>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
