import { API_BASE_URL } from '../config';

const base = `${API_BASE_URL}/api/WorkoutExercises`;

async function create(token, workoutId, exerciseId, sets = []) {
  const body = {
    exerciseId: exerciseId,
    workoutId: workoutId,
    sets: (sets || []).map(s => ({ Weight: s.weight ?? s.Weight ?? 0, Reps: s.reps ?? s.Reps ?? 0 }))
  };
  const res = await fetch(base, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to create workout exercise'}`);
  }
  const data = await res.json();
  return {
    id: data.id ?? data.Id,
    exerciseId: data.exerciseId ?? data.ExerciseId,
    exerciseName: data.exerciseName ?? data.ExerciseName,
    sets: (data.sets || data.Sets || []).map(s => ({ id: s.id ?? s.Id, reps: s.reps ?? s.Reps, weight: s.weight ?? s.Weight }))
  };
}

async function update(token, id, payload) {
  const res = await fetch(`${base}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to update workout exercise'}`);
  }
  return res.json();
}

async function remove(token, id) {
  const res = await fetch(`${base}/${id}`, {
    method: 'DELETE',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to delete workout exercise'}`);
  }
  return true;
}

export default { create, update, delete: remove };
