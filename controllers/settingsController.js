const User = require('../models/User');
const Score = require('../models/Score');
const History = require('../models/History');
const Request = require('../models/Request');
const bcrypt = require('bcryptjs');

const changePassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const resetAllPoints = async (req, res) => {
  try {
    await Score.updateMany({}, { score: 0 });

    // Log this action in history
    const historyEntry = new History({
      user: req.user._id,
      points: 0,
      reason: 'System Reset',
      notes: 'All points were reset to zero'
    });
    await historyEntry.save();

    res.json({ message: 'All points reset to zero' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const clearHistory = async (req, res) => {
  try {
    await History.deleteMany({});

    // Log this action
    const historyEntry = new History({
      user: req.user._id,
      points: 0,
      reason: 'System Reset',
      notes: 'History was cleared'
    });
    await historyEntry.save();

    res.json({ message: 'History cleared' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const resetEverything = async (req, res) => {
  try {
    await Score.updateMany({}, { score: 0 });
    await History.deleteMany({});
    await Request.deleteMany({});

    // Log this action
    const historyEntry = new History({
      user: req.user._id,
      points: 0,
      reason: 'System Reset',
      notes: 'Complete system reset performed'
    });
    await historyEntry.save();

    res.json({ message: 'Complete system reset performed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { 
  changePassword, 
  resetAllPoints, 
  clearHistory, 
  resetEverything 
};