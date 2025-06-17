const Score = require('../models/Score');
const User = require('../models/User');

const getLeaderboard = async (req, res) => {
  try {
    const scores = await Score.find()
      .populate('user', 'username')
      .sort({ score: -1 });

    res.json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateScore = async (req, res) => {
  try {
    const { userId, points } = req.body;

    const score = await Score.findOneAndUpdate(
      { user: userId },
      { $inc: { score: points } },
      { new: true, upsert: true }
    ).populate('user', 'username');

    res.json(score);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getLeaderboard, updateScore };