const express = require('express');
const router = express.Router();
const { createNotification, getMemberNotifications, getAllNotifications, changeReadStatus } = require('../controllers/NotificationController');
const RequireAuth = require('../middleware/RequireAuth');

// require authentication for all the notification requests
router.use(RequireAuth);

router.post('/create', createNotification);

router.get('/:id', getMemberNotifications )

router.get('/', getAllNotifications);

router.get('/changestatus', changeReadStatus);

module.exports = router;