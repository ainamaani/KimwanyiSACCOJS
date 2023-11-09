const mongoose = require('mongoose');
const Member = require('../models/Member');

const LoanSchema = new mongoose.Schema({
    member:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Member,
        required:true
    },
    amountRequested:{
        type:String,
        required:[true, 'Amount being requested is required']
    },
    prefferedPaymentSchedule:{
        type:String,
        required:[true, 'Preffered payment schedule is required'],
        enum:{
            values: ["Monthly", "Quarterly", "Yearly"],
            message: "The schedule must be one of 'Monthly', 'Quarterly' or 'Yearly'"
        } 
    },
    loanPurpose:{
        type:String,
        required:[true, 'Loan purpose is required'],
    },
    loanType:{
        type:String,
        required:[true, 'Loan type is required'],
    },
    monthlyIncome:{
        type:String,
        required:[true, 'Monthly income is required'],
    },
    otherSourcesOfIncome:{
        type:String,
        required:[true, 'Other sources of income required'],
        default: 'None'
    },
    guarantorName:{
        type:String,
        required:[true, 'Guarantor Name is required']
    },
    guarantorEmail:{
        type:String,
        required:[true, 'Guarantor Name is required'],
        validate: {
            validator: async function (value){
                // Check if the email format is valid
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if (!emailRegex.test(value)) {
                    throw new Error('Invalid email format. Please provide a valid email address.');
                }
            }
        }
    },
    guarantorPhoneNumber:{
        type:String,
        required:[true, 'Guarantor Phone Number is required'],
        validate: {
            validator: async function(value){
                // Check if the phone number has at least 10 digits
                if(value.length < 10){
                    throw new Error('Phone number must be not less than 10 digits');
                }
            }
        }
    },
    requestStatus:{
        type:String,
        default: "Pending",
        enum: {
            values: ["Approved", "Denied" ,"Pending"],
            message: "The loan request status must be one of the values 'Approved','Denied' and 'Pending' "
        }
    },
    loanStatus: {
        type:String,
        default: "Open",
        enum: {
            values: ["Open","Closed"],
            message: "The loan status must be one of the values 'Open' or 'Closed' "
        }
    }
    

},{timestamps:true});

module.exports = mongoose.model('Loan',LoanSchema);