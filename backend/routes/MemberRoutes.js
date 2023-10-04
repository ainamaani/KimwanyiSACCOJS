const express = require("express");
const { handleMemberApplication,getMemberData,
    getSingleMember,updateMemberData,declineApplication,
    approveMembership,deleteMember } = require("../controllers/MemberController");
const router = express.Router();


router.post('/apply', handleMemberApplication);

router.get('/', getMemberData);

router.get('/:id', getSingleMember);

router.patch('/update/:id', updateMemberData);

router.get('/decline/:id', declineApplication);

router.get('/approve/:id', approveMembership);

router.delete('/delete/:id', deleteMember);


module.exports = router
