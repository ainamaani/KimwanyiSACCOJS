const express = require('express');
const router = express.Router();
const { getAccounts,getMemberAccountData } = require('../controllers/AccountController');

router.get('/', getAccounts);

router.get('/member/:id',getMemberAccountData);

module.exports = router;