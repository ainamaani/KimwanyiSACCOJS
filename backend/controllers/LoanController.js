const Member = require('../models/Member');
const Loan = require('../models/Loan');

const handleLoanRequest = async(req,res) =>{
    const { email } = req.params;
    const { amountRequested,prefferedPaymentSchedule,loanPurpose,
        loanType,monthlyIncome,otherSourcesOfIncome,guarantorName,guarantorEmail,guarantorPhoneNumber } = req.body;


    try {
        const member = await Member.findOne({ email });
        if(member){
            const memberApplying = member._id;

            const loanApplicant = await Loan.create({ amountRequested,prefferedPaymentSchedule,loanPurpose,
                loanType,monthlyIncome,otherSourcesOfIncome,guarantorName,guarantorEmail,guarantorPhoneNumber,member : memberApplying });

            if(loanApplicant){
                return res.status(200).json(loanApplicant);
            }else{
                return res.status(400).json({ error: "Failed to add loan applicant" })
            }
        }else{
            return res.status(400).json({ error: "Member trying to apply doesn't exist" });
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
        }else{
            return res.status(400).json({ error: error.message });
        }
        
    }
}

const getLoanRequests = async(req,res) =>{
    try {
        // fetch all the loan requests
        const requests = await Loan.find({}).sort({ createdAt: -1 }).populate('member');
        if(requests){
            return res.status(200).json(requests);
        }else{
            return res.status(400).json({ error: "Failed to fetch all the loan requests" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    handleLoanRequest,
    getLoanRequests
}