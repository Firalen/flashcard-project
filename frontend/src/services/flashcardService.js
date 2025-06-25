import { getToken } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function authHeader() {
  return { Authorization: `Bearer ${getToken()}` };
}

export async function getFlashcards(deckId) {
  const res = await fetch(`${API_URL}/decks/${deckId}/flashcards`, { headers: authHeader() });
  return res.json();
}

export async function createFlashcard(deckId, data) {
  const res = await fetch(`${API_URL}/decks/${deckId}/flashcards`, {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateFlashcard(deckId, id, data) {
  const res = await fetch(`${API_URL}/decks/${deckId}/flashcards/${id}`, {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteFlashcard(deckId, id) {
  const res = await fetch(`${API_URL}/decks/${deckId}/flashcards/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  });
  return res.json();
} 