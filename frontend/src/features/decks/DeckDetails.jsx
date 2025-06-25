import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const mockDecks = [
  { id: 1, name: 'Math', description: 'Algebra, Geometry, Calculus' },
  { id: 2, name: 'Biology', description: 'Cells, Genetics, Evolution' },
];

const initialFlashcards = [
  { id: 1, front: 'What is 2+2?', back: '4', tags: ['easy'], difficulty: 'Easy' },
  { id: 2, front: 'What is the powerhouse of the cell?', back: 'Mitochondria', tags: ['biology'], difficulty: 'Medium' },
];

const DeckDetails = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const deck = mockDecks.find(d => d.id === Number(deckId));
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [error, setError] = useState('');
  const [editModal, setEditModal] = useState({ open: false, card: null });
  const [editFront, setEditFront] = useState('');
  const [editBack, setEditBack] = useState('');

  if (!deck) {
    return (
      <div className="text-center text-red-600">Deck not found. <button className="underline" onClick={() => navigate(-1)}>Go back</button></div>
    );
  }

  const handleAddFlashcard = (e) => {
    e.preventDefault();
    setError('');
    if (!front.trim() || !back.trim()) {
      setError('Both front and back are required.');
      return;
    }
    setFlashcards([
      ...flashcards,
      { id: Date.now(), front, back, tags: [], difficulty: 'Easy' },
    ]);
    setFront('');
    setBack('');
  };

  const handleDelete = (id) => {
    setFlashcards(flashcards.filter(card => card.id !== id));
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

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setFlashcards(flashcards.map(card =>
      card.id === editModal.card.id ? { ...card, front: editFront, back: editBack } : card
    ));
    closeEditModal();
  };

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
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-colors">Add Flashcard</button>
      </form>
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      <ul className="space-y-4 w-full">
        {flashcards.map(card => (
          <li key={card.id} className="p-4 bg-blue-50 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
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
                onClick={() => handleDelete(card.id)}
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
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-colors">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default DeckDetails; 