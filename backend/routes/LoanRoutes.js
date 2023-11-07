const express = require('express');
const router = express.Router();
const { handleLoanRequest, getLoanRequests } = require('../controllers/LoanController');
const RequireAuth = require('../middleware/RequireAuth');

// require authentication for all the loan requests
router.use(RequireAuth);

router.get('/requests', getLoanRequests);

router.post('/request/:email', handleLoanRequest);


module.exports = router;