import { API_BASE_URL } from '../config';

const base = `${API_BASE_URL}/api/WorkoutTemplates`;

async function getAll(token) {
  const res = await fetch(base, {
    method: 'GET',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to load templates'}`);
  }
  const data = await res.json();
  // normalize response
  return (data || []).map(t => ({
    id: t.id ?? t.Id,
    name: t.name ?? t.Name,
    description: t.description ?? t.Description,
    exercises: (t.exercises || t.Exercises || []).map(e => ({
      id: e.id ?? e.Id,
      exerciseId: e.exerciseId ?? e.ExerciseId,
      exerciseName: e.exerciseName ?? e.ExerciseName,
      sets: (e.sets || e.Sets || []).map(s => ({
        id: s.id ?? s.Id,
        targetReps: s.targetReps ?? s.TargetReps,
        targetWeight: s.targetWeight ?? s.TargetWeight,
      }))
    }))
  }));
}

async function create(token, payload) {
  const res = await fetch(base, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to create template'}`);
  }
  return res.json();
}

async function getById(token, id) {
  const res = await fetch(`${base}/${id}`, {
    method: 'GET',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to load template'}`);
  }
  const t = await res.json();
  return {
    id: t.id ?? t.Id,
    name: t.name ?? t.Name,
    description: t.description ?? t.Description,
    exercises: (t.exercises || t.Exercises || []).map(e => ({
      id: e.id ?? e.Id,
      exerciseId: e.exerciseId ?? e.ExerciseId,
      exerciseName: e.exerciseName ?? e.ExerciseName,
      sets: (e.sets || e.Sets || []).map(s => ({
        id: s.id ?? s.Id,
        targetReps: s.targetReps ?? s.TargetReps,
        targetWeight: s.targetWeight ?? s.TargetWeight,
      }))
    }))
  };
}

async function update(token, id, payload) {
  const res = await fetch(`${base}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to update template'}`);
  }
  return res.json();
}

async function remove(token, id) {
  const res = await fetch(`${base}/${id}`, {
    method: 'DELETE',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to delete template'}`);
  }
  return true;
}

export default { getAll, create, getById, update, delete: remove };
