const express = require('express');
const router = express.Router();
const { makeTransaction, getTransactions } =  require('../controllers/TransactionController');

router.get('/',getTransactions);

router.post('/maketransaction/:id', makeTransaction);

module.exports = router;