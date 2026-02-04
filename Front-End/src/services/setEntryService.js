import { API_BASE_URL } from '../config';

const base = `${API_BASE_URL}/api/SetsEntries`;

async function create(token, payload) {
  const res = await fetch(base, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to create set entry'}`);
  }
  return res.json();
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
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to update set entry'}`);
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
    throw new Error(`${res.status} ${res.statusText}: ${txt || 'Failed to delete set entry'}`);
  }
  return true;
}

export default { create, update, delete: remove };
