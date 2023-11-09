const express = require('express');
const router = express.Router();
const { createNotification, getMemberNotifications, getAllNotifications } = require('../controllers/NotificationController');
const RequireAuth = require('../middleware/RequireAuth');

// require authentication for all the notification requests
router.use(RequireAuth);

router.post('/create', createNotification);

router.get('/:id', getMemberNotifications )

router.get('/', getAllNotifications);

module.exports = router;