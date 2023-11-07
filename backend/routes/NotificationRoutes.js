const express = require('express');
const router = express.Router();
const { createNotification, getMemberNotifications } = require('../controllers/NotificationController');
const RequireAuth = require('../middleware/RequireAuth');

// require authentication for all the notification requests
router.use(RequireAuth);

router.post('/create', createNotification);

router.get('/:id', getMemberNotifications )

module.exports = router;