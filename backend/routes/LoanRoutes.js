const express = require('express');
const router = express.Router();
const { handleLoanRequest, getLoanRequests,approveLoanRequest,declineLoanRequest, getApprovedLoans } = require('../controllers/LoanController');
const RequireAuth = require('../middleware/RequireAuth');

// require authentication for all the loan requests
router.use(RequireAuth);

router.get('/requests', getLoanRequests);

router.get('/givenloans', getApprovedLoans);

router.post('/request/:email', handleLoanRequest);

router.post('/approverequest/:id', approveLoanRequest);

router.get('/declinerequest/:id', declineLoanRequest);


module.exports = router;