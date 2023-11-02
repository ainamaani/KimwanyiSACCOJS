const express = require('express');
const router = express.Router();
const {resetForgotPassword,verifyEmail,getResetPasswordRequests} = require('../controllers/AuthController');

router.post('/forgotpassword', resetForgotPassword);

router.post('/verifyemail', verifyEmail);

router.post('/resetrequests', getResetPasswordRequests);

module.exports = router

