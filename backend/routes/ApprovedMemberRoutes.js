const express = require('express');
const router = express.Router();
const { handleNewApprovedMemberLogin } = require('../controllers/ApprovedMemberController');
const upload = require('../middleware/MulterConfig');
const RequireAuth = require('../middleware/RequireAuth');

// require authentication for all the approved member requests
router.use(RequireAuth);

router.post('/newlogin', upload.fields([{ name: 'profilePic',maxCount: 1}]), handleNewApprovedMemberLogin);

module.exports = router;