const express = require("express");
const { handleMemberApplication,getMemberData,
    getSingleMember,updateMemberData,declineApplication,
    approveMembership,deleteMember,getApprovedMembers, memberLogin,
    loggedInUserData } = require("../controllers/MemberController");
const router = express.Router();


router.post('/apply', handleMemberApplication);

router.get('/approvedmembers', getApprovedMembers);

router.post('/login', memberLogin);

router.get('/', getMemberData);

router.get('/member/:email', loggedInUserData );

router.get('/:id', getSingleMember);

router.patch('/update/:id', updateMemberData);

router.get('/decline/:id', declineApplication);

router.get('/approve/:id', approveMembership);

router.delete('/delete/:id', deleteMember);


module.exports = router
