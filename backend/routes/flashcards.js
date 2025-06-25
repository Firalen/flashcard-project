const express = require('express');
const router = express.Router({ mergeParams: true });
const { getFlashcards, createFlashcard, getFlashcard, updateFlashcard, deleteFlashcard } = require('../controllers/flashcardController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', getFlashcards);
router.post('/', createFlashcard);
router.get('/:id', getFlashcard);
router.put('/:id', updateFlashcard);
router.delete('/:id', deleteFlashcard);

module.exports = router; 