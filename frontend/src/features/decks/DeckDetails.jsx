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
    <section className="w-full max-w-2xl mx-auto bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl p-10 flex flex-col items-center border border-blue-100 mt-6 md:mt-12">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-1 tracking-tight drop-shadow">{deck.name}</h2>
      <p className="text-gray-600 mb-8 text-lg text-center">{deck.description}</p>
      <form onSubmit={handleAddFlashcard} className="flex flex-col md:flex-row gap-3 mb-8 w-full">
        <input
          type="text"
          placeholder="Front (question)"
          value={front}
          onChange={e => setFront(e.target.value)}
          className="flex-1 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 shadow"
        />
        <input
          type="text"
          placeholder="Back (answer)"
          value={back}
          onChange={e => setBack(e.target.value)}
          className="flex-1 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 shadow"
        />
        <button type="submit" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition-all" disabled={creating}>
          {creating ? 'Adding...' : 'Add Flashcard'}
        </button>
      </form>
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      <ul className="space-y-5 w-full">
        {flashcards.map(card => (
          <li key={card._id} className="p-6 bg-white/70 backdrop-blur rounded-xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between border border-blue-100 hover:scale-[1.01] hover:shadow-2xl transition-all">
            <div>
              <div className="font-semibold text-blue-800 text-lg">Q: {card.front}</div>
              <div className="text-gray-700">A: {card.back}</div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                className="px-4 py-2 bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-900 rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition-all"
                onClick={() => openEditModal(card)}
              >Edit</button>
              <button
                className="px-4 py-2 bg-gradient-to-r from-red-200 to-red-400 text-red-900 rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition-all"
                onClick={() => handleDelete(card._id)}
              >Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Modal */}
      {editModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-blue-100">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={closeEditModal}
              aria-label="Close"
            >&times;</button>
            <h3 className="text-2xl font-bold mb-6 text-blue-700 tracking-tight drop-shadow">Edit Flashcard</h3>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={editFront}
                onChange={e => setEditFront(e.target.value)}
                className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 shadow"
                placeholder="Front (question)"
                required
              />
              <input
                type="text"
                value={editBack}
                onChange={e => setEditBack(e.target.value)}
                className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 shadow"
                placeholder="Back (answer)"
                required
              />
              <button type="submit" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition-all" disabled={editLoading}>
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