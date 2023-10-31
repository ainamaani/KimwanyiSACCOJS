const express = require('express');
const router = express.Router();
const { makeTransaction, getTransactions, getMemberTransactions } =  require('../controllers/TransactionController');

router.get('/',getTransactions);

router.post('/maketransaction/:id', makeTransaction);

router.get('/member/:id', getMemberTransactions);

module.exports = router;