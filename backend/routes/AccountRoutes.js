const express = require('express');
const router = express.Router();
const { getAccounts } = require('../controllers/AccountController');

router.get('/', getAccounts);

module.exports = router;