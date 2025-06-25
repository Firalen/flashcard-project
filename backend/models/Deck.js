const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard' }],
}, { timestamps: true });

module.exports = mongoose.model('Deck', deckSchema); 