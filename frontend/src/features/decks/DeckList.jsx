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

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-8 text-blue-800 tracking-tight drop-shadow flex items-center gap-2">
        <span role="img" aria-label="books">📚</span> Your Decks
      </h2>
      <form onSubmit={handleAddDeck} className="flex flex-col md:flex-row gap-4 mb-10 bg-white/60 p-5 rounded-xl shadow border border-blue-100">
        <input
          type="text"
          placeholder="Deck name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="flex-1 px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90 shadow-sm text-lg"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="flex-1 px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90 shadow-sm text-lg"
        />
        <button type="submit" className="px-7 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-bold shadow hover:scale-105 hover:shadow-xl transition-all text-lg" disabled={creating}>
          {creating ? 'Adding...' : 'Add Deck'}
        </button>
      </form>
      {error && <div className="text-red-600 mb-4 text-center font-semibold">{error}</div>}
      {loading ? (
        <div className="text-center text-gray-400 py-10 text-lg">Loading decks...</div>
      ) : decks.length === 0 ? (
        <div className="text-center text-gray-400 py-10 flex flex-col items-center gap-4">
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
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {decks.map(deck => (
            <li key={deck._id} className="p-7 bg-white/80 backdrop-blur rounded-2xl shadow-xl flex flex-col gap-3 border border-blue-100 hover:scale-[1.02] hover:shadow-2xl transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <span className="text-3xl group-hover:scale-110 transition-transform">📖</span>
                <div>
                  <div className="font-bold text-2xl text-blue-900 group-hover:text-blue-600 transition-colors">{deck.name}</div>
                  <div className="text-gray-600 text-base mt-1">{deck.description}</div>
                </div>
              </div>
              <button
                className="self-end mt-2 px-6 py-2 bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition-all"
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