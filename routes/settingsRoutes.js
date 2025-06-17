const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const settingsController = require('../controllers/settingsController');

router.post('/change-password', auth(), settingsController.changePassword);
router.post('/reset-points', auth(['admin']), settingsController.resetAllPoints);
router.post('/clear-history', auth(['admin']), settingsController.clearHistory);
router.post('/reset-all', auth(['admin']), settingsController.resetEverything);

module.exports = router;