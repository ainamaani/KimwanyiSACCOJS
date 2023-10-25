const Member = require('../models/Member');
const mongoose = require('mongoose');
require('dotenv').config();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//SEND EMAIL FUNCTION
const sendEmail = (toEmail,emailSubject,emailMessage) =>{
    //create transporter to send emails via Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    //define email options
    const mailOptions = {
        from : 'Kimwanyi SACCO <aina.isaac2002@gmail.com>',
        to:toEmail,
        subject:emailSubject,
        text:emailMessage

    };

    //Send the Email
    transporter.sendMail(mailOptions,function(error, info){
        if(error){
            console.log(error)
        }else{
            console.log('Email sent:' + info.response)
        }
    })
}

const handleMemberApplication = async(req,res) =>{
    const {firstName,lastName,gender,dateOfBirth,residentialAddress,email,phoneNumber,
    employmentStatus,currentOccupation,employerName,employerEmail,employerPhoneNumber,
    nextOfKin,nextOfKinEmail,nextOfKinPhoneNumber,membershipStatus} = req.body;

    // generate salt to be used to hash
    const salt = await bcrypt.genSalt(10);
    // hash the phone number to make the password
    const pword = await bcrypt.hash(phoneNumber,salt);

    try {
        const memberApplication = await Member.create({ firstName,lastName,gender,dateOfBirth,residentialAddress,email,phoneNumber,
            employmentStatus,currentOccupation,employerName,employerEmail,employerPhoneNumber,
            nextOfKin,nextOfKinEmail,nextOfKinPhoneNumber,membershipStatus, password:pword });
        if(memberApplication){
            return res.status(200).json(memberApplication);
        }else{
            return res.status(400).json({ error: "Member application failed"});
        }
        
    } catch (error) {
          // Check if the error is a validation error
        if (error.name === 'ValidationError' || error.code === 11000) {
            const errors = {};
    
            // Iterate through the validation errors and build the errors object
            for (const field in error.errors) {
            errors[field] = error.errors[field].message;
            }
    
            return res.status(400).json({ errors });
        }else if (error.code === 11000 && error.keyPattern.email) {
            // Handle the unique constraint violation error for the email field
            errors.email = "Email already exists";
        }
        // Handle other types of errors (e.g., database errors) here
        return res.status(500).json({ error: error.message });
    }
}

const getMemberData = async(req,res)=>{
    try {
        //attempt to fetch the data of all the members that applied
        const memberData = await Member.find({}).sort({ createdAt: -1 });
        if(memberData){
            return res.status(200).json(memberData);
        }else{
            return res.status(400).json({error: "Failed to fetch the member data"});
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const getSingleMember = async(req,res)=>{
    //checking if the id is a valid MongoDB id
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "The id provided is not valid"});
    }
    try {
        const member = await Member.findById(id);
        if(member){
            return res.status(200).json(member);
        }else{
            return res.status(400).json({error: "Failed to retrieve a member with that id"});
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const updateMemberData = async(req,res)=>{
    const updatedFields = req.body;
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "The id provided is not valid"});
    }
    try {
        const updatedMemberData = await Member.findByIdAndUpdate(id,updatedFields,{new:true});
        if(updatedMemberData){
            return res.status(200).json(updatedMemberData);
        }else{
            return res.status(400).json({error: "Failed to update the member data"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

//decline member
const declineApplication = async(req,res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "The id provided for the application to be declined is not valid"});
    }
    try {
        //retrieve the member to decline from the database
        const memberToDecline = await Member.findById(id);
        if(memberToDecline){
            //change the membership status to Declined
            memberToDecline.membershipStatus = "Declined";
            //save the new member object after updating the membership status
            await memberToDecline.save({ validateBeforeSave:false });
            
            //SEND EMAIL AFTER DECLINING MEMBER
            sendEmail('aina.isaac2002@gmail.com',
                    'Membership Declined',
                    `Dear ${memberToDecline.firstName} ${memberToDecline.lastName},

We hope this message finds you well.
We regret to inform you that after careful consideration, your application for membership at Kimwanyi SACCO has been declined.
While we appreciate your interest in joining our SACCO, our membership criteria and capacity constraints have led us to make this difficult decision. Please note that this decision is not a reflection of your qualifications or character.
We encourage you to explore other opportunities and financial institutions that may better match your needs and requirements. If you have any questions or would like more information regarding our decision, please feel free to contact our SACCO office.
Thank you for considering Kimwanyi SACCO for your financial needs. We wish you all the best in your financial endeavors.

Sincerely,

Ainamaani Isaac
Human Resource Manager
Kimwanyi SACCO`);
            
            res.status(200).json(memberToDecline);
        }else{
            return res.status(400).json({error: "Failed to retrieve the member to decline"});
        }
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

//approve member
const approveMembership = async(req,res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "The valid provided for member approval is not valid"});
    }
    try {
        //retrieve the member to be approved from the database
        const memberToApprove = await Member.findById(id);
        //change the member's membership status to Approved
        if(memberToApprove){
            memberToApprove.membershipStatus = "Approved";

            //save the member object with the new membership status
            const approvedMember = await memberToApprove.save({ validateBeforeSave:false });

            if(approvedMember){
                //send approval email
                sendEmail('aina.isaac2002@gmail.com',
                            'Membership Approval',
                            `Dear ${memberToApprove.firstName} ${memberToApprove.lastName},

We are delighted to inform you that your application to join Kimwanyi SACCO has been approved.
Congratulations! Your membership with Kimwanyi SACCO is now active. We look forward to having you as a valued member of our organization.
If you have any questions or need further information, please feel free to contact our SACCO office. We are here to assist you with any inquiries you may have.
Thank you for choosing Kimwanyi SACCO for your financial needs. We are excited to have you as part of our community.

Sincerely,

Ainamaani Isaac
Human Resource Manager
Kimwanyi SACCO`);
                return res.status(200).json(approvedMember);
            }else{
                return res.status(400).json("Saving new membership status failed");
            }    
        }else{
            return res.status(400).json({error: "Failed to retrieve member to approve"});
        }      
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

//delete member
const deleteMember = async(req,res)=>{
    //destructure the id property from the request object
    const {id} = req.params;
    //checking if the id is a valid MongoDB id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "The provided id for member deletion is not valid"});
    }
    try {
        //retrieve member to be deleted
        const memberToDelete = await Member.findByIdAndDelete(id);
        if(memberToDelete){
            return res.status(200).json({message : `member deleted, ${memberToDelete}`});
        }else{
            return res.status(400).json({error : "Failed to delete the member"});
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

//fetch approved members
const getApprovedMembers = async(req,res) =>{
    try {
        const approvedMembers = await Member.find({ membershipStatus:"Approved" }).sort({ createdAt: -1 });
        if(approvedMembers){
            return res.status(200).json(approvedMembers);
        }else{
            return res.status(400).json({ error: "Could not fetch the approved members" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

//Function to create the jsonwebtoken
const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

// member login
const memberLogin = async(req,res) =>{
    // destructure the email and password properties off the request body
    const { email, password } = req.body; 
    // validation
    if(!email || !password){
        return res.status(400).json({error : "All fields are required"});
    }

    // retrieve user corresponding to the email
    const member = await Member.findOne({email});
    if(!member){
        return res.status(400).json({ error: "Incorrect credentials" });
    }
    if(member.membershipStatus === "Not Approved"){
        return res.status(400).json({ error: "Your SACCO membership hasn't been approved yet" });
    }
    if(member.membershipStatus === "Declined"){
        return res.status(400).json({ error: "Sorry!! Your SACCO membership was declined" });
    }

    const pwordMatches = await bcrypt.compare(password, member.password);
    if(!pwordMatches){
        return res.status(400).json({ error: "Incorrect credentials"});
    }else{
        // create a token for a logged in user
        const token = createToken(member._id);
        const firstName = member.firstName;

        // return the token and other details when the credentials match
        return res.status(200).json({ token ,email ,firstName});
    }
}

const loggedInUserData = async(req,res) =>{
    const {email } = req.params;
    try {
        // fetch user corresponding to the email on the request body
        const loggedInUser = await Member.find({ email });
        if(loggedInUser){
            res.status(200).json(loggedInUser);
        }else{
            res.status(400).json({ error: "Could not fetch the logged in user details" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


const changePassword = async(req,res) =>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ error: "The id provided is not valid" });
    }
    const { currentPassword, newPassword } = req.body;
    if(!currentPassword || !newPassword){
        return res.status(400).json({ error: "Both fields are required" });
    }
    try {
        const member = await Member.findById(id);
        if(member){
            const currentPwordMatch = await bcrypt.compare(currentPassword, member.password);
            if(!currentPwordMatch){
                res.status(400).json({ error: "Enter the correct current password" });
            }else{
                // generate salt for the new password
                const salt = await bcrypt.genSalt(10);
                // generate hash for the new password
                const hashedNewPassword = await bcrypt.hash(newPassword, salt);

                member.password = hashedNewPassword;
                await member.save({ validateBeforeSave: false });
                return res.status(200).json({ message: "Password changed successfully" });
            }
        }else{
            return res.status(400).json({ error: "Member with that id doesn't exist"});
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    handleMemberApplication,
    getMemberData,
    getSingleMember,
    updateMemberData,
    declineApplication,
    approveMembership,
    deleteMember,
    getApprovedMembers,
    memberLogin,
    loggedInUserData,
    changePassword
}