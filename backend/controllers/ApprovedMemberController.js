const ApprovedMember = require('../models/ApprovedMember');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const upload = require('../middleware/MulterConfig');


const handleNewApprovedMemberLogin = async(req,res) =>{
    
    try {

        // Get the uploaded file path from the request object
        const imagePath = req.files['profilePic'][0].path;

        // Get other data from the request body
        const {password,passwordConfirm } = req.body;

        if(!imagePath || !password || !passwordConfirm){
            throw new Error("All fields are required");
        }
    
        if(!validator.isStrongPassword(password)){
            throw new Error("Please enter a strong password");
        }
    
        if(password !== passwordConfirm){
            throw new Error("Passwords entered do not match");
        }
        //Generate the salt to be used to hash passwords
        const salt = await bcrypt.genSalt(10);

        //Hash passwords
        const hash = await bcrypt.hash(password,salt);

        //Adding the object to the database
        const newApprovedMemberLogin = await ApprovedMember.create({ profilePic:imagePath, password:hash });
        if(newApprovedMemberLogin){
            return res.status(200).json(newApprovedMemberLogin);
        }

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

}


module.exports = {
    handleNewApprovedMemberLogin
}