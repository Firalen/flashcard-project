import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialDecks = [
  { id: 1, name: 'Math', description: 'Algebra, Geometry, Calculus' },
  { id: 2, name: 'Biology', description: 'Cells, Genetics, Evolution' },
];

const DeckList = () => {
  const [decks, setDecks] = useState(initialDecks);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddDeck = (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Deck name is required.');
      return;
    }
    setDecks([
      ...decks,
      { id: Date.now(), name, description },
    ]);
    setName('');
    setDescription('');
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
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-colors">Add Deck</button>
      </form>
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      <ul className="space-y-4">
        {decks.map(deck => (
          <li key={deck.id} className="p-4 bg-blue-50 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-bold text-lg text-blue-800">{deck.name}</div>
              <div className="text-gray-600 text-sm">{deck.description}</div>
            </div>
            <button
              className="mt-2 md:mt-0 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              onClick={() => navigate(`/decks/${deck.id}`)}
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeckList; 