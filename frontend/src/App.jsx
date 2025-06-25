import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Study from './pages/Study';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import DeckDetails from './features/decks/DeckDetails';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      <Router>
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/study" element={<Study />} />
            <Route path="/decks/:deckId" element={<DeckDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
