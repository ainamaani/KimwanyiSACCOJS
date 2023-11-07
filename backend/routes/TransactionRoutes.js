const express = require('express');
const router = express.Router();
const { makeTransaction, getTransactions, getMemberTransactions } =  require('../controllers/TransactionController');
const RequireAuth = require('../middleware/RequireAuth');

// require authentication for all the transaction requests
router.use(RequireAuth);

router.get('/',getTransactions);

router.post('/maketransaction/:id', makeTransaction);

router.get('/member/:id', getMemberTransactions);

module.exports = router;