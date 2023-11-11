const express = require('express');
const router = express.Router();
const { getAccounts,getMemberAccountData, freezeAccount, unFreezeAccount } = require('../controllers/AccountController');
const RequireAuth = require('../middleware/RequireAuth');

// require authentication for all the account requests
router.use(RequireAuth);

router.get('/', getAccounts);

router.get('/member/:id',getMemberAccountData);

router.get('/freeze/:id',freezeAccount);

router.get('/unfreeze/:id',unFreezeAccount)

module.exports = router;