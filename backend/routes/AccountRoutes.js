const express = require('express');
const router = express.Router();
const { getAccounts,getMemberAccountData, freezeAccount } = require('../controllers/AccountController');

router.get('/', getAccounts);

router.get('/member/:id',getMemberAccountData);

router.get('/freeze/:id',freezeAccount);

module.exports = router;