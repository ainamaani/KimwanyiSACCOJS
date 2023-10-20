const mongoose = require('mongoose');
const Member = require('../models/Member');

const LoanSchema = new mongoose.Schema({
    member:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Member,
        required:true
    },
    

},{timestamps:true});

module.exports = mongoose.model('Loan',LoanSchema);