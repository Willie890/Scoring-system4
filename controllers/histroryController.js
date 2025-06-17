const History = require('../models/History');
const User = require('../models/User');

const getHistory = async (req, res) => {
  try {
    const { userId, startDate, endDate, reason } = req.query;
    let query = {};

    if (userId) query.user = userId;
    if (reason) query.reason = new RegExp(reason, 'i');
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const history = await History.find(query)
      .populate('user', 'username')
      .sort({ timestamp: -1 });

    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const addHistory = async (req, res) => {
  try {
    const { userId, points, reason, notes } = req.body;

    const historyEntry = new History({
      user: userId,
      points,
      reason,
      notes
    });

    await historyEntry.save();
    
    const populatedEntry = await History.findById(historyEntry._id)
      .populate('user', 'username');

    res.status(201).json(populatedEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getHistory, addHistory };