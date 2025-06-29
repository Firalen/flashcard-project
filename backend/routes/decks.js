const express = require('express');
const router = express.Router();
const { getDecks, createDeck, getDeck, updateDeck, deleteDeck } = require('../controllers/deckController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', getDecks);
router.post('/', createDeck);
router.get('/:id', getDeck);
router.put('/:id', updateDeck);
router.delete('/:id', deleteDeck);

module.exports = router; 