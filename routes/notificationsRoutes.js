const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const notificationsController = require('../controllers/notificationsController');

router.get('/', auth(['admin']), notificationsController.getPendingRequests);
router.post('/', auth(), notificationsController.createRequest);
router.put('/:id', auth(['admin']), notificationsController.updateRequestStatus);

module.exports = router;