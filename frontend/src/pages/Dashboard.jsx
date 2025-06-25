import React from 'react';
import DeckList from '../features/decks/DeckList';

const Dashboard = () => (
  <section className="w-full max-w-3xl mx-auto bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl p-10 flex flex-col items-center border border-blue-100 mt-6 md:mt-12">
    <h1 className="text-4xl font-extrabold text-blue-700 mb-2 tracking-tight drop-shadow">Welcome to Flashcards!</h1>
    <p className="text-gray-600 mb-8 text-lg text-center">Create, organize, and study your flashcards efficiently.</p>
    <div className="w-full mt-4">
      <DeckList />
    </div>
  </section>
);

export default Dashboard; 