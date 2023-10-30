const express = require('express');
const router = express.Router();
const { makeTransaction } =  require('../controllers/TransactionController');

router.get('/')

router.post('/maketransaction/:id', makeTransaction);

module.exports = router;