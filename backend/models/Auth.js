const mongoose = require('mongoose');
const Member = require('./Member');

const AuthSchema = new mongoose.Schema({
    member:{
        type:mongoose.Schema.Types.ObjectId,
        ref: Member,
        required:true
    },
    resetPasswordCode:{
        type:String,
        required:true
    }

},{timestamps:true});

module.exports = mongoose.model('Auth',AuthSchema);