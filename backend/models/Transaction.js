const mongoose = require('mongoose');
const Member = require('./Member');

const TransactionSchema = new mongoose.Schema({
    member:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Member,
        required:[true, "Member carrying out transaction required"]
    },
    amount: {
        type: Number,
        required:[true, "The amount is required"]
    },
    transactionType: {
        type: String,
        required:[true, "The transaction type is required"],
        enum: {
            values : ["Deposit","Withdraw","Internal transfer"],
            message: "The transaction type must be one of 'Deposit','Withdraw' or 'Internal transfer'"
        }
    },
    transactionDate: {
        type: Date,
        required:[true, "The date of the transaction is required"]
    },
    transactionStatus: {
        type: String,
        required: [true, "The transaction status is required"],
        emum: {
            values: ["Pending","Completed","Failed"],
            message: "The transaction status must be one of 'Pending','Completed' or 'Failed'"
        }
    },
    transactionApprovalStatus: {
        type: String,
        required: [true, "The transaction approval status is required"],
        default: "Approved",
        enum: {
            values: ["Approved","Not approved"],
            message: "The transaction approval status must be one of 'Approved' or 'Not Approved'"
        }
    }
},{timestamps:true})

module.exports = mongoose.model('Transaction',TransactionSchema);