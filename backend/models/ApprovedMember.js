const mongoose = require('mongoose');
const Member = require('../models/Member');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const ApprovedMemberSchema = new mongoose.Schema({
    profilePic:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
},{timestamps:true});



module.exports = mongoose.model('ApprovedMember',ApprovedMemberSchema);