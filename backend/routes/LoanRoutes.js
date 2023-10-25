const express = require('express');
const router = express.Router();
const { handleLoanRequest } = require('../controllers/LoanController');

router.post('/request/:email', handleLoanRequest);


module.exports = router;