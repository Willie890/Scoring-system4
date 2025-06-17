const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/User');

// Get all users (for admin dropdowns)
router.get('/', auth(['admin']), async (req, res) => {
  try {
    const users = await User.find({}, 'username role');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;