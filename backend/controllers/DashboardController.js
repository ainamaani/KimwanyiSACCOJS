const Member = require('../models/Member');
const Account = require('../models/Account');

const getDashboardStatistics = async(req,res) =>{
    try {
        const NumberOfMembers = await Member.countDocuments({ membershipStatus: "Approved" });
        const NumberOfPendingApplications = await Member.countDocuments({ membershipStatus: "Not Approved" });
        const NumberOfDeclinedApplications = await Member.countDocuments({ membershipStatus: "Declined" });

        // calculate the money in the system
        const accounts = await Account.find({},'accountBalance');
        let totalAccountBalance = 0;

        if(accounts){
            for(const account of accounts){
                totalAccountBalance += account.accountBalance;
            }
        }

        const statistics = {
            NumberOfMembers,NumberOfPendingApplications,NumberOfDeclinedApplications,
            totalAccountBalance
        }
        return res.status(200).json(statistics);
        
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getDashboardStatistics
}