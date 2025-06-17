const Request = require('../models/Request');
const User = require('../models/User');
const Score = require('../models/Score');

const getPendingRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: 'pending' })
      .populate('requestingUser', 'username')
      .populate('receivingUser', 'username')
      .sort({ timestamp: -1 });

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const createRequest = async (req, res) => {
  try {
    const { requestingUserId, receivingUserId, points, reason, additionalNotes } = req.body;

    const request = new Request({
      requestingUser: requestingUserId,
      receivingUser: receivingUserId,
      points,
      reason,
      additionalNotes
    });

    await request.save();
    
    const populatedRequest = await Request.findById(request._id)
      .populate('requestingUser', 'username')
      .populate('receivingUser', 'username');

    res.status(201).json(populatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { requestId, status } = req.body;

    const request = await Request.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    )
    .populate('requestingUser', 'username')
    .populate('receivingUser', 'username');

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    // If approved, update the user's score
    if (status === 'approved') {
      await Score.findOneAndUpdate(
        { user: request.receivingUser },
        { $inc: { score: request.points } },
        { new: true, upsert: true }
      );
    }

    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getPendingRequests, createRequest, updateRequestStatus };