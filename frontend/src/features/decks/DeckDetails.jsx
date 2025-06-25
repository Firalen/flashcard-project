import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFlashcards, createFlashcard, updateFlashcard, deleteFlashcard } from '../../services/flashcardService';
import { getDecks } from '../../services/deckService';

const DeckDetails = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editModal, setEditModal] = useState({ open: false, card: null });
  const [editFront, setEditFront] = useState('');
  const [editBack, setEditBack] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    async function fetchDeckAndFlashcards() {
      setLoading(true);
      const decks = await getDecks();
      const foundDeck = Array.isArray(decks) ? decks.find(d => d._id === deckId) : null;
      setDeck(foundDeck);
      const cards = await getFlashcards(deckId);
      setFlashcards(Array.isArray(cards) ? cards : []);
      setLoading(false);
    }
    fetchDeckAndFlashcards();
  }, [deckId]);

  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    setError('');
    if (!front.trim() || !back.trim()) {
      setError('Both front and back are required.');
      return;
    }
    setCreating(true);
    const newCard = await createFlashcard(deckId, { front, back });
    if (newCard && newCard._id) {
      setFlashcards([...flashcards, newCard]);
      setFront('');
      setBack('');
    } else {
      setError(newCard.message || 'Failed to create flashcard');
    }
    setCreating(false);
  };

  const handleDelete = async (id) => {
    await deleteFlashcard(deckId, id);
    setFlashcards(flashcards.filter(card => card._id !== id));
  };

  const openEditModal = (card) => {
    setEditFront(card.front);
    setEditBack(card.back);
    setEditModal({ open: true, card });
  };

  const closeEditModal = () => {
    setEditModal({ open: false, card: null });
    setEditFront('');
    setEditBack('');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    const updated = await updateFlashcard(deckId, editModal.card._id, { front: editFront, back: editBack });
    setEditLoading(false);
    if (updated && updated._id) {
      setFlashcards(flashcards.map(card => card._id === updated._id ? updated : card));
      closeEditModal();
    } else {
      setError(updated.message || 'Failed to update flashcard');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 py-8">Loading deck...</div>;
  }
  if (!deck) {
    return (
      <div className="text-center text-red-600">Deck not found. <button className="underline" onClick={() => navigate(-1)}>Go back</button></div>
    );
  }

  return (
    <section className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-blue-700 mb-1">{deck.name}</h2>
      <p className="text-gray-600 mb-6 text-center">{deck.description}</p>
      <form onSubmit={handleAddFlashcard} className="flex flex-col md:flex-row gap-2 mb-6 w-full">
        <input
          type="text"
          placeholder="Front (question)"
          value={front}
          onChange={e => setFront(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Back (answer)"
          value={back}
          onChange={e => setBack(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-colors" disabled={creating}>
          {creating ? 'Adding...' : 'Add Flashcard'}
        </button>
      </form>
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      <ul className="space-y-4 w-full">
        {flashcards.map(card => (
          <li key={card._id} className="p-4 bg-blue-50 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-semibold text-blue-800">Q: {card.front}</div>
              <div className="text-gray-700">A: {card.back}</div>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors"
                onClick={() => openEditModal(card)}
              >Edit</button>
              <button
                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                onClick={() => handleDelete(card._id)}
              >Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Modal */}
      {editModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              onClick={closeEditModal}
              aria-label="Close"
            >&times;</button>
            <h3 className="text-lg font-bold mb-4 text-blue-700">Edit Flashcard</h3>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={editFront}
                onChange={e => setEditFront(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Front (question)"
                required
              />
              <input
                type="text"
                value={editBack}
                onChange={e => setEditBack(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Back (answer)"
                required
              />
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-colors" disabled={editLoading}>
                {editLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default DeckDetails; 