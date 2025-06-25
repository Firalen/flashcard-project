const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Deck = require('../models/Deck');
const Flashcard = require('../models/Flashcard');

router.post('/', auth, async (req, res) => {
  try {
    // Sample decks
    const mathDeck = await Deck.create({
      name: 'Math Basics',
      description: 'Addition, subtraction, multiplication, division',
      owner: req.user.userId,
    });
    const bioDeck = await Deck.create({
      name: 'Biology',
      description: 'Cells, genetics, evolution',
      owner: req.user.userId,
    });
    // Sample flashcards
    await Flashcard.create([
      { front: 'What is 2 + 2?', back: '4', deck: mathDeck._id, owner: req.user.userId },
      { front: 'What is 5 x 3?', back: '15', deck: mathDeck._id, owner: req.user.userId },
      { front: 'What is the powerhouse of the cell?', back: 'Mitochondria', deck: bioDeck._id, owner: req.user.userId },
      { front: 'What is DNA?', back: 'Deoxyribonucleic acid', deck: bioDeck._id, owner: req.user.userId },
    ]);
    res.json({ message: 'Sample decks and flashcards created!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create samples.' });
  }
});

module.exports = router; 