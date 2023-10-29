const express = require('express');
const router = express.Router();
const { makeTransaction } =  require('../controllers/TransactionController');

router.post('/maketransaction', makeTransaction);

module.exports = router;