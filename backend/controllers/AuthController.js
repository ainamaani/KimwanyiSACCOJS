const Member = require('../models/Member');
const { sendEmail } = require('../controllers/MemberController');
const ResetPassword = require('../models/Auth');

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

        const newResetPassword = await ResetPassword.create({member:memberExists._id ,resetPasswordCode:resetCode});
        if(newResetPassword){
            return res.status(200).json(newResetPassword);
        }else{
            return res.status(400).json({ error: "Failed to add new reset password object" });
        }

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

}

const getResetPasswordRequests = async(req,res) =>{
    try {
        
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


const resetForgotPassword = async(req,res) =>{
    
}

module.exports = {
    resetForgotPassword,
    verifyEmail,
    getResetPasswordRequests
}