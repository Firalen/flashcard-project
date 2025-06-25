const Flashcard = require('../models/Flashcard');

exports.getFlashcards = async (req, res) => {
  const flashcards = await Flashcard.find({ deck: req.params.deckId, owner: req.user.userId });
  res.json(flashcards);
};

exports.createFlashcard = async (req, res) => {
  const { title, front, back, tags, difficulty } = req.body;
  const flashcard = await Flashcard.create({
    title,
    front,
    back,
    tags,
    difficulty,
    deck: req.params.deckId,
    owner: req.user.userId,
  });
  res.status(201).json(flashcard);
};

exports.getFlashcard = async (req, res) => {
  const flashcard = await Flashcard.findOne({ _id: req.params.id, deck: req.params.deckId, owner: req.user.userId });
  if (!flashcard) return res.status(404).json({ message: 'Flashcard not found' });
  res.json(flashcard);
};

exports.updateFlashcard = async (req, res) => {
  const flashcard = await Flashcard.findOneAndUpdate(
    { _id: req.params.id, deck: req.params.deckId, owner: req.user.userId },
    req.body,
    { new: true }
  );
  if (!flashcard) return res.status(404).json({ message: 'Flashcard not found' });
  res.json(flashcard);
};

exports.deleteFlashcard = async (req, res) => {
  const flashcard = await Flashcard.findOneAndDelete({ _id: req.params.id, deck: req.params.deckId, owner: req.user.userId });
  if (!flashcard) return res.status(404).json({ message: 'Flashcard not found' });
  res.json({ message: 'Flashcard deleted' });
}; 