const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const leaderboardController = require('../controllers/leaderboardController');

router.get('/', leaderboardController.getLeaderboard);
router.post('/update', auth(['admin']), leaderboardController.updateScore);

module.exports = router;