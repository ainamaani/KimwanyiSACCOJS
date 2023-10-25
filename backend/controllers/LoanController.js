const Member = require('../models/Member');
const Loan = require('../models/Loan');

const handleLoanRequest = async(req,res) =>{
    const { email } = req.params;
    const { amountRequested,prefferedPaymentSchedule,loanPurpose,
        loanType,monthlyIncome,otherSourcesOfIncome,guarantorName,guarantorEmail } = req.body;


    try {
        const member = await Member.find({ email });
        if(member){
            const memberApplying = member._id;

            const loanApplicant = await Loan.create({ amountRequested,prefferedPaymentSchedule,loanPurpose,
                loanType,monthlyIncome,otherSourcesOfIncome,guarantorName,guarantorEmail,member : memberApplying });

            if(loanApplicant){
                return res.status(200).json(loanApplicant);
            }else{
                return res.status(400).json({ error: "Failed to add loan applicant" })
            }
        }else{
            return res.status(400).json({ error: "Member trying to apply doesn't exist" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    handleLoanRequest
}