import React from 'react';
import DeckList from '../features/decks/DeckList';

const Dashboard = () => (
  <section className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-8 flex flex-col items-center">
    <h1 className="text-3xl font-bold text-blue-700 mb-2">Welcome to Flashcards!</h1>
    <p className="text-gray-600 mb-6 text-center">Create, organize, and study your flashcards efficiently.</p>
    <div className="w-full mt-4">
      <DeckList />
    </div>
  </section>
);

export default Dashboard; 