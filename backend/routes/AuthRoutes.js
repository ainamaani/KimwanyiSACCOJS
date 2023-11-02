const express = require('express');
const router = express.Router();
const {resetForgotPassword,verifyEmail,getResetPasswordRequests} = require('../controllers/AuthController');

router.post('/forgotpassword', resetForgotPassword);

router.post('/verifyemail', verifyEmail);

router.get('/resetrequests', getResetPasswordRequests);

module.exports = router
