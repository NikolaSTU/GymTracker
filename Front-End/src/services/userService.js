import { API_BASE_URL } from '../config';

const base = `${API_BASE_URL}/api/Users`;

async function getAll(token) {
  const res = await fetch(base, {
    method: 'GET',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to load users'}`);
  }
  return res.json();
}

async function update(token, id, userData) {
  // Backend expects the id as a query parameter for this controller, so send PUT to the collection route
  const res = await fetch(`${base}?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to update user'}`);
  }
  return res.json();
}

async function remove(token, id) {
  // Controller accepts DELETE with id passed as query parameter
  const res = await fetch(`${base}?id=${id}`, {
    method: 'DELETE',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to delete user'}`);
  }
  return true;
}

export default { getAll, update, delete: remove };