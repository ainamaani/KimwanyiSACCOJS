const Loan = require('../models/Loan');
const Account = require('../models/Account');

async function PayLoan(){
    try {
        // fetch all loans
        const loans = await Loan.find({});
        for(const loan of loans){
            if( loan.loanStatus === "Open" && loan.requestStatus === "Approved"){
                // get member id who requested the loan
                const memberId = loan.member;
                const loanDate = loan.createdAt;
                // fetch account corresponding to the member
                const memberAccount = await Account.findOne({ member: memberId });
                if(memberAccount){
                    const dateDifference = Date.now() - loanDate.getTime();

                    let paymentSchedule = 1; // default to monthly

                    if(loan.prefferedPaymentSchedule === "Quarterly"){
                        paymentSchedule = 3; // change to quarterly which is three months
                    }else if(loan.prefferedPaymentSchedule === "Yearly"){
                        paymentSchedule = 12; // change to yearly which is twelve months
                    }

                    const minimumTime = paymentSchedule * 2.628e+9;

                        if(dateDifference >= minimumTime){
                            memberAccount.accountBalance -= loan.amountRequested;
                            await memberAccount.save({ validateBeforeSave:false });
                            // close the loan
                            loan.loanStatus = "Closed"
                            await loan.save({ validateBeforeSave:false });
                    } 
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
} 


module.exports = {PayLoan}

