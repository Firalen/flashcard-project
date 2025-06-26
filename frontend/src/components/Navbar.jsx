import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-lg shadow-xl border-b border-blue-100 px-6 py-3 flex items-center justify-between transition-all">
      <div className="flex items-center gap-3">
        <span className="text-blue-700 font-extrabold text-2xl tracking-tight flex items-center gap-2">
          <span className='text-3xl'>🧠</span> Flashcards
        </span>
      </div>
      {/* Hamburger for mobile */}
      <button className="md:hidden flex flex-col gap-1 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span className={`block w-6 h-0.5 bg-blue-700 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-blue-700 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-blue-700 transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>
      <ul className={`md:flex gap-8 m-0 p-0 list-none items-center transition-all ${menuOpen ? 'flex flex-col absolute top-16 right-6 bg-white/90 rounded-xl shadow-lg px-8 py-6 z-50' : 'hidden md:flex'}`}>
        {user && <li><Link to="/" className="nav-link">Dashboard</Link></li>}
        {user && <li><Link to="/study" className="nav-link">Study</Link></li>}
        {!user && <li><Link to="/login" className="nav-link">Login</Link></li>}
        {!user && <li><Link to="/signup" className="nav-link">Signup</Link></li>}
        {user && (
          <li className="flex items-center gap-2 mt-2 md:mt-0">
            <span className="w-8 h-8 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold text-lg shadow-sm border border-blue-300">
              {getInitials(user.name || user.email)}
            </span>
            <button onClick={handleLogout} className="text-red-600 font-semibold hover:underline bg-transparent border-none cursor-pointer ml-2">Logout</button>
          </li>
        )}
      </ul>
      <style>{`
        .nav-link {
          position: relative;
          color: #1e40af;
          font-weight: 600;
          padding-bottom: 2px;
          transition: color 0.2s;
        }
        .nav-link:after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -2px;
          height: 2px;
          background: linear-gradient(90deg, #60a5fa, #818cf8);
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.2s;
        }
        .nav-link:hover:after, .nav-link:focus:after {
          transform: scaleX(1);
        }
        .nav-link:hover, .nav-link:focus {
          color: #2563eb;
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 