import React, { useEffect, useState } from 'react';
import { getDecks } from '../services/deckService';
import { getFlashcards } from '../services/flashcardService';

const Study = () => {
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDecks() {
      setLoading(true);
      const data = await getDecks();
      setDecks(Array.isArray(data) ? data : []);
      setLoading(false);
    }
    fetchDecks();
  }, []);

  const handleSelectDeck = async (deckId) => {
    setSelectedDeck(deckId);
    setLoading(true);
    const cards = await getFlashcards(deckId);
    setFlashcards(Array.isArray(cards) ? cards : []);
    setCurrent(0);
    setShowBack(false);
    setLoading(false);
  };

  const handleFlip = () => setShowBack((prev) => !prev);
  const handleNext = () => {
    setCurrent((prev) => (prev + 1 < flashcards.length ? prev + 1 : 0));
    setShowBack(false);
  };
  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 >= 0 ? prev - 1 : flashcards.length - 1));
    setShowBack(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-blue-100 mt-6 md:mt-12">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-6 tracking-tight drop-shadow">Study Mode</h2>
      {loading && <div className="text-center text-gray-400 py-8">Loading...</div>}
      {!selectedDeck ? (
        <>
          <p className="mb-4 text-gray-600 text-lg">Select a deck to start studying:</p>
          <ul className="w-full space-y-3">
            {decks.map(deck => (
              <li key={deck._id}>
                <button
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-200 text-blue-800 rounded-xl hover:scale-[1.03] hover:shadow-lg transition-all duration-200 text-left font-semibold shadow"
                  onClick={() => handleSelectDeck(deck._id)}
                >
                  <span className="inline-block align-middle mr-2">📚</span>{deck.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : flashcards.length === 0 ? (
        <div className="text-center text-gray-400 py-8">No flashcards in this deck.</div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <div className="mb-4 text-blue-800 font-semibold text-lg">Deck: {decks.find(d => d._id === selectedDeck)?.name}</div>
          <div className="w-full flex justify-between mb-2">
            <button onClick={handlePrev} className="px-4 py-2 bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 rounded-lg hover:scale-105 hover:shadow transition-all font-semibold">Prev</button>
            <span className="text-gray-500 font-medium">{current + 1} / {flashcards.length}</span>
            <button onClick={handleNext} className="px-4 py-2 bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 rounded-lg hover:scale-105 hover:shadow transition-all font-semibold">Next</button>
          </div>
          {/* Flip Card Animation */}
          <div className="perspective w-full flex justify-center mb-4" style={{ perspective: 1000 }}>
            <div
              className={`relative w-full max-w-md h-48 cursor-pointer select-none transition-transform duration-500 [transform-style:preserve-3d] ${showBack ? 'rotate-y-180' : ''}`}
              onClick={handleFlip}
              title="Click to flip"
            >
              {/* Front */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-xl shadow-lg text-2xl font-bold text-center transition-all duration-300 [backface-visibility:hidden]">
                {flashcards[current].front}
              </div>
              {/* Back */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 rounded-xl shadow-lg text-2xl font-bold text-center transition-all duration-300 [backface-visibility:hidden] rotate-y-180">
                {flashcards[current].back}
              </div>
            </div>
          </div>
          <button onClick={() => setSelectedDeck(null)} className="mt-4 text-blue-600 hover:underline font-semibold">Choose another deck</button>
        </div>
      )}
    </div>
  );
};

export default Study; 