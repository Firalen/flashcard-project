import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-lg rounded-b-2xl px-8 py-4 mb-8 flex items-center justify-between border-b border-blue-100">
      <div className="flex items-center gap-3">
        <span className="text-blue-600 font-extrabold text-2xl tracking-tight drop-shadow">🧠 Flashcards</span>
      </div>
      <ul className="flex gap-8 m-0 p-0 list-none items-center">
        {user && <li><Link to="/" className="text-blue-800 font-semibold hover:text-blue-500 transition-colors">Dashboard</Link></li>}
        {user && <li><Link to="/study" className="text-blue-800 font-semibold hover:text-blue-500 transition-colors">Study</Link></li>}
        {!user && <li><Link to="/login" className="text-blue-800 font-semibold hover:text-blue-500 transition-colors">Login</Link></li>}
        {!user && <li><Link to="/signup" className="text-blue-800 font-semibold hover:text-blue-500 transition-colors">Signup</Link></li>}
        {user && <li><button onClick={handleLogout} className="text-red-600 font-semibold hover:underline bg-transparent border-none cursor-pointer">Logout</button></li>}
      </ul>
    </nav>
  );
};

export default Navbar; 