const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const authRoutes = require('./routes/auth');
const deckRoutes = require('./routes/decks');
const flashcardRoutes = require('./routes/flashcards');

app.use('/api/auth', authRoutes);
app.use('/api/decks', deckRoutes);
app.use('/api/decks/:deckId/flashcards', flashcardRoutes);

// Routes will be added here

app.get('/', (req, res) => {
  res.send('Flashcard API is running');
});

module.exports = app; 