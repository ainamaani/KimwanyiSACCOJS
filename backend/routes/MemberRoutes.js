const express = require("express");
const { handleMemberApplication,getMemberData,
    getSingleMember,updateMemberData,declineApplication,
    approveMembership,deleteMember,getApprovedMembers, memberLogin,
    loggedInUserData,changePassword } = require("../controllers/MemberController");
const router = express.Router();

const RequireAuth = require('../middleware/RequireAuth');


router.post('/apply', handleMemberApplication);

router.post('/login', memberLogin);

// require authentication for all the member requests
router.use(RequireAuth);

router.get('/approvedmembers', getApprovedMembers);

router.get('/', getMemberData);

router.get('/member/:email', loggedInUserData );

router.get('/:id', getSingleMember);

router.patch('/update/:id', updateMemberData);

router.get('/decline/:id', declineApplication);

router.get('/approve/:id', approveMembership);

router.delete('/delete/:id', deleteMember);

router.post('/changepassword/:id', changePassword);


module.exports = router
