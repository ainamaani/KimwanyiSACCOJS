const express = require('express');
const router = express.Router();
const {resetForgotPassword,verifyEmail,getResetPasswordRequests} = require('../controllers/AuthController');

const RequireAuth = require('../middleware/RequireAuth');

router.post('/forgotpassword', resetForgotPassword);

router.post('/verifyemail', verifyEmail);

// require authentication for all the auth requests
router.use(RequireAuth);

router.get('/resetrequests', getResetPasswordRequests);

module.exports = router

