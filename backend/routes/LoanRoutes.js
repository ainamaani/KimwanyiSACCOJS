const express = require('express');
const router = express.Router();
const { handleLoanRequest, getLoanRequests } = require('../controllers/LoanController');

router.get('/requests', getLoanRequests);

router.post('/request/:email', handleLoanRequest);


module.exports = router;