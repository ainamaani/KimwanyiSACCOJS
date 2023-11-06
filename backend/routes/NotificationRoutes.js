const express = require('express');
const router = express.Router();
const { createNotification, getMemberNotifications } = require('../controllers/NotificationController');

router.post('/create', createNotification);

router.get('/:id', getMemberNotifications )

module.exports = router;