import { API_BASE_URL } from '../config';

const base = `${API_BASE_URL}/api/Workout`;

async function startFromTemplate(token, templateId) {
  // Prevent creating a new active workout if one exists in localStorage (single-active-workout client policy)
  try {
    const active = localStorage.getItem('activeWorkoutId');
    if (active) throw new Error('Finish or delete your current active workout before starting a new one.');
  } catch (e) {
    // if localStorage access fails, continue — server-side will still create
    if (e.message && e.message.indexOf('Finish or delete') === -1) {
      // ignore other errors
    } else if (e.message && e.message.indexOf('Finish or delete') !== -1) {
      throw e;
    }
  }
  const res = await fetch(`${base}/FromTemplate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ templateId: templateId, date: new Date().toISOString(), name: 'Workout from template' }),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to start workout from template'}`);
  }
  return res.json();
}

async function startEmpty(token) {
  // Prevent creating a new active workout if one exists in localStorage
  try {
    const active = localStorage.getItem('activeWorkoutId');
    if (active) throw new Error('Finish or delete your current active workout before starting a new one.');
  } catch (e) {
    if (e.message && e.message.indexOf('Finish or delete') !== -1) throw e;
  }

  const res = await fetch(base, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ name: 'Empty Workout', date: new Date().toISOString(), exercises: [] }),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to start empty workout'}`);
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
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to load workout'}`);
  }
  return res.json();
}

async function getHistory(token, userId) {
  const res = await fetch(`${base}/user/${userId}`, {
    method: 'GET',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to load workout history'}`);
  }
  return res.json();
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
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to update workout'}`);
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
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to delete workout'}`);
  }
  return true;
}

export default { startFromTemplate, startEmpty, getHistory, getById, update, delete: remove };
