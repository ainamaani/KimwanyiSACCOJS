const mongoose = require('mongoose');
const Member = require('../models/Member');

const AccountSchema = new mongoose.Schema({
    member:{
        type: mongoose.Schema.Types.ObjectId,
        ref:Member,
        required: [true, "The owner of the account is required"]
    },
    accountNumber:{
        type:String,
        required: [true, "The account number is required"]
    },
    accountBalance:{
        type: Number,
        required: [true, "The account balance is required"]
    },
    openingDate:{
        type: Date,
        required: [true, "The opening date for he account is required"]
    },
    closingDate:{
        type: Date,   
        default: null
    },
    accountStatus:{
        type:String,
        required: [true, "The account status is requied"],
        enum:{
            values: ["Active","Inactive","Frozen"],
            message: "The account status can only be 'Active','Inactive' or 'Frozen'"
        }
    }
},{timestamps:true});

module.exports = mongoose.model('Account',AccountSchema);