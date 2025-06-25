import { getToken } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function authHeader() {
  return { Authorization: `Bearer ${getToken()}` };
}

export async function getDecks() {
  const res = await fetch(`${API_URL}/decks`, { headers: authHeader() });
  return res.json();
}

export async function createDeck({ name, description }) {
  const res = await fetch(`${API_URL}/decks`, {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  });
  return res.json();
}

export async function updateDeck(id, data) {
  const res = await fetch(`${API_URL}/decks/${id}`, {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteDeck(id) {
  const res = await fetch(`${API_URL}/decks/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  });
  return res.json();
} 