const express = require('express');
const router = express.Router();
const { getDashboardStatistics } = require('../controllers/DashboardController');

router.get('/statistics',getDashboardStatistics);

module.exports = router;