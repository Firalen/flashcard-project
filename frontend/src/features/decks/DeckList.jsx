import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDecks, createDeck } from '../../services/deckService';

const DeckList = () => {
  const [decks, setDecks] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDecks() {
      setLoading(true);
      const data = await getDecks();
      setDecks(Array.isArray(data) ? data : []);
      setLoading(false);
    }
    fetchDecks();
  }, []);

  const handleAddDeck = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Deck name is required.');
      return;
    }
    setCreating(true);
    const newDeck = await createDeck({ name, description });
    if (newDeck && newDeck._id) {
      setDecks([...decks, newDeck]);
      setName('');
      setDescription('');
    } else {
      setError(newDeck.message || 'Failed to create deck');
    }
    setCreating(false);
  };

  const handleLoadSamples = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    await fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '/samples', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    // Refresh decks
    const data = await getDecks();
    setDecks(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setError('');
    setName('');
    setDescription('');
  };

  return (
    <div className="w-full relative">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 tracking-tight drop-shadow flex items-center gap-2">
        <span role="img" aria-label="books">📚</span> Your Decks
      </h2>
      <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-blue-200 rounded-full mb-8" />
      {/* Floating Action Button */}
      <button
        className="fixed bottom-10 right-10 z-30 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:scale-110 transition-all text-3xl"
        onClick={openModal}
        title="Add Deck"
      >
        +
      </button>
      {/* Modal for Add Deck */}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl font-bold"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4 text-blue-700">Create New Deck</h3>
            <form onSubmit={handleAddDeck} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Deck name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 shadow"
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 shadow"
              />
              {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
              <button type="submit" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition-all" disabled={creating}>
                {creating ? 'Adding...' : 'Add Deck'}
              </button>
            </form>
          </div>
        </div>
      )}
      {loading ? (
        <div className="text-center text-gray-400 py-8">Loading decks...</div>
      ) : decks.length === 0 ? (
        <div className="text-center text-gray-400 py-8 flex flex-col items-center gap-4">
          <span className="text-2xl">🗂️</span>
          <span>No decks found.</span>
          <button
            className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition-all"
            onClick={handleLoadSamples}
          >
            Load Sample Decks & Cards
          </button>
        </div>
      ) : (
        <ul className="space-y-5">
          {decks.map(deck => (
            <li key={deck._id} className="p-6 bg-white/70 backdrop-blur rounded-xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between border border-blue-100 hover:scale-[1.01] hover:shadow-2xl transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📖</span>
                <div>
                  <div className="font-bold text-xl text-blue-800 group-hover:text-blue-600 transition-colors">{deck.name}</div>
                  <div className="text-gray-600 text-sm">{deck.description}</div>
                </div>
                {/* Deck stats badge */}
                <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold shadow-sm animate-fade-in">{deck.cardsCount || 0} cards</span>
              </div>
              <button
                className="mt-4 md:mt-0 px-5 py-2 bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition-all"
                onClick={() => navigate(`/decks/${deck._id}`)}
              >
                Study Deck
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeckList; 