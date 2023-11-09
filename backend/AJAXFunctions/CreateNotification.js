const Loan = require('../models/Loan');
const Notification = require('../models/Notification');
const Member = require('../models/Member');

async function CreateNotification (){
    try {
        const loans = await Loan.find({});
        for(const loan of loans){
            let loanMaturityDate = loan.createdAt.getTime() + 2.628e+9; // default for a month

            if(loan.prefferedPaymentSchedule === "Quarterly"){
                loanMaturityDate *= 3;
            }else if(loan.prefferedPaymentSchedule === "Yearly"){
                loanMaturityDate *= 12;
            }
            if(loanMaturityDate - Date.now() === 4.32e+8){
                // get member details
                const memberToSendNotification = await Member.findById(loan.member);
                const newNotification = await Notification.create({ 
                    member: loan.member, 
                    notificationType: "Loan reminder",
                    notificationContent: `Dear ${memberToSendNotification.firstName}, be reminded that your loan is due in the next five days`
                
                });
                if(newNotification){
                    console.log(newNotification);
                }
            }
            
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = CreateNotification;