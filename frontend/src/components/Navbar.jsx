import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-white shadow-md rounded-b-lg px-6 py-3 mb-6 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className="text-blue-600 font-extrabold text-xl tracking-tight">🧠 Flashcards</span>
    </div>
    <ul className="flex gap-6 m-0 p-0 list-none">
      <li><Link to="/" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">Dashboard</Link></li>
      <li><Link to="/study" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">Study</Link></li>
      <li><Link to="/login" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">Login</Link></li>
      <li><Link to="/signup" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">Signup</Link></li>
    </ul>
  </nav>
);

export default Navbar; 