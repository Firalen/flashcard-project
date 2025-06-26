import React from 'react';
import DeckList from '../features/decks/DeckList';

const Dashboard = () => (
  <main className="relative min-h-screen flex flex-col items-center justify-start pt-10 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-x-hidden">
    {/* Decorative background blob */}
    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-200 opacity-30 rounded-full blur-3xl z-0" />
    <div className="absolute -bottom-40 right-0 w-[400px] h-[400px] bg-purple-200 opacity-20 rounded-full blur-3xl z-0" />

    <section className="relative z-10 w-full max-w-3xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-blue-100 mt-6 md:mt-14">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-3 tracking-tight drop-shadow-lg">Welcome to Flashcards!</h1>
      <p className="text-gray-700 mb-10 text-xl text-center max-w-2xl">Master your knowledge with beautiful, organized flashcards. Create, study, and track your progress—all in one place.</p>
      <div className="w-full mt-2">
        <DeckList />
      </div>
    </section>
  </main>
);

export default Dashboard; 