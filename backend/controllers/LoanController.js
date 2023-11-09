const Member = require('../models/Member');
const Loan = require('../models/Loan');
const Account = require('../models/Account');
const {sendEmail} = require('../controllers/MemberController');

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

const approveLoanRequest = async(req,res) =>{
    const {id} = req.params;
    const {loanAmount} = req.body;
    console.log("Loan amount", loanAmount);

    try {
        const loanRequestToApprove = await Loan.findById(id);
        if(loanRequestToApprove){
            loanRequestToApprove.requestStatus = "Approved"
            await loanRequestToApprove.save({ validateBeforeSave:false });
            // get member to send email to
            const memberToApprove = await Loan.findById(id).select('member');
            const memberToReceiveLoan = await Member.findById(memberToApprove.member);

            // credit the account with the amount
            const memberAccountToCredit = await Account.findOne({ member: memberToApprove.member });
            // credit the amount with the loan fee
            console.log("Account balance", memberAccountToCredit.accountBalance);
            memberAccountToCredit.accountBalance += parseFloat(loanAmount);
            // save the updated object
            await memberAccountToCredit.save({ validateBeforeSave:false });

            // send email to member after approval
            sendEmail(memberToReceiveLoan.email,
                    "Loan Request Approval",
                    `Dear ${memberToReceiveLoan.firstName} ${memberToReceiveLoan.lastName},

We hope this message finds you well.
We are delighted to inform you that the request loan has been approved. 
Your account will be credited with the requested amount.Thank you.

Sincerely,

Ainamaani Isaac
Human Resource Manager
Kimwanyi SACCO`
                );

            

            return res.status(200).json(loanRequestToApprove);
        }else{
            return res.status(400).json({ error: "Failed to fetch loan request to approve" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const declineLoanRequest = async(req,res) =>{
    const {id} = req.params;
    try {
        const loanRequestToDecline = await Loan.findById(id);
        if(loanRequestToDecline){
            loanRequestToDecline.requestStatus = "Declined"
            await loanRequestToDecline.save({ validateBeforeSave: false });
            // fetch member who requested
            const memberId = await Loan.findById(id).select('member');
            const memberRequestDeclined = await Member.findById(memberId.member);

            // send decline email
            sendEmail(memberRequestDeclined.email,
                    'Loan Request Declined',
                    `Dear ${memberRequestDeclined.firstName} ${memberRequestDeclined.lastName},

We hope this message finds you well.
We are sorry to inform you that after careful evaluation of your loan request, it has been declined.
Contact the loans manager on 0770941412 for information on why the request was declined. Thank you.

Sincerely,

Ainamaani Isaac
Human Resource Manager
Kimwanyi SACCO`
                );
            return res.status(200).json(loanRequestToDecline);
        }else{
            return res.status(400).json({ error: "Failed to fetch the loan request to decline" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getApprovedLoans = async(req,res) =>{
    try {
        const approvedLoans = await Loan.find({ requestStatus: "Approved" }).populate('member');
        if(approvedLoans){
            return res.status(200).json(approvedLoans);
        }else{
            return res.status(400).json({ error: "Failed to fetch the approved loans" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    handleLoanRequest,
    getLoanRequests,
    approveLoanRequest,
    declineLoanRequest,
    getApprovedLoans
}