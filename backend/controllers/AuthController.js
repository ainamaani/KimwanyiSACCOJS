const Member = require('../models/Member');
const { sendEmail } = require('../controllers/MemberController');
const ResetPassword = require('../models/Auth');
const bcrypt = require('bcrypt');

// function to generate 6-digit verification code
function generateRandomCode() {
    const min = 100000; // The minimum 6-digit number (100000)
    const max = 999999; // The maximum 6-digit number (999999)
    // Generate a random number between min and max (inclusive)
    const passwordResetCode = Math.floor(Math.random() * (max - min + 1)) + min;
    // Convert the number to a string and return it
    return passwordResetCode.toString();

}

const verifyEmail = async(req,res) =>{
    const {memberEmail} = req.body;

    if(!memberEmail){
        return res.status(400).json({ error: "The email is required please!!" });
    }

    try {
        const memberExists = await Member.findOne({ email:memberEmail });
        if(!memberExists){
            return res.status(400).json({ error: "Member with that email doesn't exist" });
        }

        const memberStatus = memberExists.membershipStatus;
        if(memberStatus === "Not Approved" || memberStatus === "Declined"){
            return res.status(400).json({ error: "You are not a SACCO member yet"});
        }

        let resetCode = generateRandomCode();

        // send reset password code via email
        sendEmail(memberEmail,'Password Reset',
        `Dear ${memberExists.firstName} ${memberExists.lastName},

Your password reset code is ${resetCode}

Sincerely,

Ainamaani Isaac
Human Resource Manager
Kimwanyi SACCO`
        );

        // check if member already made a reset password request
        const memberAlreadyRequested = await ResetPassword.findOne({ member: memberExists._id });

        if(memberAlreadyRequested){
            memberAlreadyRequested.resetPasswordCode = resetCode;
            // save new object in the database after changing the resetPasswordCode property
            await memberAlreadyRequested.save({ validateBeforeSave:false });
            return res.status(200).json(memberAlreadyRequested);
        }else{
            const newResetPassword = await ResetPassword.create({member:memberExists._id ,resetPasswordCode:resetCode});
            if(newResetPassword){
                return res.status(200).json(newResetPassword);
            }else{
                return res.status(400).json({ error: "Failed to add new reset password object" });
            }
        }

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

}

const getResetPasswordRequests = async(req,res) =>{
    try {
        const resetPasswordRequests = await ResetPassword.find({}).populate('member').sort({ createdAt: -1 });
        if(resetPasswordRequests){
            return res.status(200).json(resetPasswordRequests);
        }else{
            return res.status(400).json({ error: "Could not fetch the reset password requests" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


const resetForgotPassword = async(req,res) =>{

    const { memberEmail, resetPwordCode, newPassword } = req.body;

    if(!memberEmail || !resetPwordCode || !newPassword){
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const memberResettingPasswordId = await Member.findOne({ email:memberEmail }).select('_id');
        const memberResettingPassword = await ResetPassword.findOne({ member:memberResettingPasswordId });
        if(memberResettingPassword){
            // get the reset Password code sent
            const sentResetCode = memberResettingPassword.resetPasswordCode;
            if(sentResetCode === resetPwordCode){
                // generate salt to hash new pword
                const salt = await bcrypt.genSalt(10);
                // hash the new password
                const newPasswordHash = await bcrypt.hash(newPassword,salt);

                // fetch the member whose password is to be changed.
                const MemberResetingPassword = await Member.findOne({ email: memberEmail });
                if(MemberResetingPassword){
                    MemberResetingPassword.password = newPasswordHash;
                    MemberResetingPassword.save({ validateBeforeSave: false });
                    return res.status(200).json(MemberResetingPassword);
                }else{
                    return res.status(400).json({ error: "Member doesn't exist" })
                }

            }else{
                return res.status(400).json({ error: "The reset code isn't correct, check your email for a correct one and try again!!" });
            }
        }else{
            return res.status(400).json({ error: "No code was sent to this email" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
    
}

module.exports = {
    resetForgotPassword,
    verifyEmail,
    getResetPasswordRequests
}