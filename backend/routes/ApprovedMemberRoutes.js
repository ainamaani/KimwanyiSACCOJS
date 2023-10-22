const express = require('express');
const router = express.Router();
const { handleNewApprovedMemberLogin } = require('../controllers/ApprovedMemberController');
const upload = require('../middleware/MulterConfig');

router.post('/newlogin', upload.fields([{ name: 'profilePic',maxCount: 1}]), handleNewApprovedMemberLogin);

module.exports = router;