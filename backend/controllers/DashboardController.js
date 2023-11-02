const Member = require('../models/Member');
const Account = require('../models/Account');

const getDashboardStatistics = async(req,res) =>{
    try {
        const numberOfMembers = await Member.countDocuments({ membershipStatus: "Approved" });
        const numberOfPendingApplications = await Member.countDocuments({ membershipStatus: "Not Approved" });
        const numberOfDeclinedApplications = await Member.countDocuments({ membershipStatus: "Declined" });

        // calculate the money in the system
        const accounts = await Account.find({},'accountBalance');
        let totalAccountBalance = 0;

        if(accounts){
            for(const account of accounts){
                totalAccountBalance += account.accountBalance;
            }
        }

        const statistics = {
            numberOfMembers,numberOfPendingApplications,numberOfDeclinedApplications,
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