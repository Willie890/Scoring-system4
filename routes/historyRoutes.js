const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const historyController = require('../controllers/historyController');

router.get('/', auth(), historyController.getHistory);
router.post('/', auth(['admin']), historyController.addHistory);

module.exports = router;