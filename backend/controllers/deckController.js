const Deck = require('../models/Deck');

exports.getDecks = async (req, res) => {
  const decks = await Deck.find({ owner: req.user.userId });
  res.json(decks);
};

exports.createDeck = async (req, res) => {
  const { name, description } = req.body;
  const deck = await Deck.create({ name, description, owner: req.user.userId });
  res.status(201).json(deck);
};

exports.getDeck = async (req, res) => {
  const deck = await Deck.findOne({ _id: req.params.id, owner: req.user.userId });
  if (!deck) return res.status(404).json({ message: 'Deck not found' });
  res.json(deck);
};

exports.updateDeck = async (req, res) => {
  const deck = await Deck.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.userId },
    req.body,
    { new: true }
  );
  if (!deck) return res.status(404).json({ message: 'Deck not found' });
  res.json(deck);
};

exports.deleteDeck = async (req, res) => {
  const deck = await Deck.findOneAndDelete({ _id: req.params.id, owner: req.user.userId });
  if (!deck) return res.status(404).json({ message: 'Deck not found' });
  res.json({ message: 'Deck deleted' });
}; 