const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  title: { type: String },
  front: { type: String, required: true },
  back: { type: String, required: true },
  tags: [{ type: String }],
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  deck: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Flashcard', flashcardSchema); 