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
    <nav className="bg-white shadow-md rounded-b-lg px-6 py-3 mb-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-blue-600 font-extrabold text-xl tracking-tight">🧠 Flashcards</span>
      </div>
      <ul className="flex gap-6 m-0 p-0 list-none">
        {user && <li><Link to="/">Dashboard</Link></li>}
        {user && <li><Link to="/study">Study</Link></li>}
        {!user && <li><Link to="/login">Login</Link></li>}
        {!user && <li><Link to="/signup">Signup</Link></li>}
        {user && <li><button onClick={handleLogout} className="text-red-600 font-medium hover:underline bg-transparent border-none cursor-pointer">Logout</button></li>}
      </ul>
    </nav>
  );
};

export default Navbar; 