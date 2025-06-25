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

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 tracking-tight drop-shadow flex items-center gap-2">
        <span>📚</span>Your Decks
      </h2>
      <form onSubmit={handleAddDeck} className="flex flex-col md:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Deck name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="flex-1 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 shadow"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="flex-1 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 shadow"
        />
        <button type="submit" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition-all" disabled={creating}>
          {creating ? 'Adding...' : 'Add Deck'}
        </button>
      </form>
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      {loading ? (
        <div className="text-center text-gray-400 py-8">Loading decks...</div>
      ) : decks.length === 0 ? (
        <div className="text-center text-gray-400 py-8">No decks found.</div>
      ) : (
        <ul className="space-y-5">
          {decks.map(deck => (
            <li key={deck._id} className="p-6 bg-white/70 backdrop-blur rounded-xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between border border-blue-100 hover:scale-[1.01] hover:shadow-2xl transition-all">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📖</span>
                <div>
                  <div className="font-bold text-xl text-blue-800">{deck.name}</div>
                  <div className="text-gray-600 text-sm">{deck.description}</div>
                </div>
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