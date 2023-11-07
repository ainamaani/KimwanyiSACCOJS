const express = require('express');
const router = express.Router();
const { getDashboardStatistics } = require('../controllers/DashboardController');
const RequireAuth = require('../middleware/RequireAuth');

// require authentication for all the dashboard requests
router.use(RequireAuth);

router.get('/statistics',getDashboardStatistics);

module.exports = router;