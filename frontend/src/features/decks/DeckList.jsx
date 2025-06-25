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
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Your Decks</h2>
      <form onSubmit={handleAddDeck} className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Deck name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-colors" disabled={creating}>
          {creating ? 'Adding...' : 'Add Deck'}
        </button>
      </form>
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      {loading ? (
        <div className="text-center text-gray-400 py-8">Loading decks...</div>
      ) : decks.length === 0 ? (
        <div className="text-center text-gray-400 py-8">No decks found.</div>
      ) : (
        <ul className="space-y-4">
          {decks.map(deck => (
            <li key={deck._id} className="p-4 bg-blue-50 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-bold text-lg text-blue-800">{deck.name}</div>
                <div className="text-gray-600 text-sm">{deck.description}</div>
              </div>
              <button
                className="mt-2 md:mt-0 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                onClick={() => navigate(`/decks/${deck._id}`)}
              >
                View
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeckList; 