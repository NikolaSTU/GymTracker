import { API_BASE_URL } from '../config';

const base = `${API_BASE_URL}/api/Exercises`;

async function getAll(token) {
  const res = await fetch(base, {
    method: 'GET',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to load exercises'}`);
  }
  const data = await res.json();
  // Normalize property names from backend (PascalCase) to camelCase
  return (data || []).map((x) => ({
    id: x.id ?? x.Id,
    name: x.name ?? x.Name ?? x.ExerciseName,
    description: x.description ?? x.Description ?? x.ExerciseDesc,
  }));
}

async function add(token, data) {
  const res = await fetch(base, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ exerciseName: data.name, exerciseDesc: data.description }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || 'Failed to add exercise');
  }
  const resData = await res.json();
  return {
    id: resData.id ?? resData.Id,
    name: resData.name ?? resData.Name ?? resData.ExerciseName,
    description: resData.description ?? resData.Description ?? resData.ExerciseDesc,
  };
}

async function update(token, id, data) {
  const res = await fetch(`${base}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ exerciseName: data.name, exerciseDesc: data.description }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || 'Failed to update exercise');
  }
  const resData = await res.json();
  return {
    id: resData.id ?? resData.Id,
    name: resData.name ?? resData.Name ?? resData.ExerciseName,
    description: resData.description ?? resData.Description ?? resData.ExerciseDesc,
  };
}

async function remove(token, id) {
  const res = await fetch(`${base}/${id}`, {
    method: 'DELETE',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || 'Failed to delete exercise');
  }
  return true;
}

export default { getAll, add, update, delete: remove };
