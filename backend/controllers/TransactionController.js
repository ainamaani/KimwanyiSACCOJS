const Member = require("../models/Member");
const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

const makeTransaction = async(req,res) =>{
    const {id} = req.params;
    const { amount,transactionType} = req.body;

    if(!amount || !transactionType){
        return res.status(400).json({ error: "Both fields are required" });
    }
         
    if(amount < 5000){
        return res.status(400).json({ error: "The minimum amount of money you can transact is 5000 UGx" })
    }

    let accountBalance;
    let accountId;

    try {
        const account = await Account.findOne({ member:id });
        if(account){
            accountBalance = account.accountBalance;
            accountId = account._id;
        }

        if(transactionType === "Deposit"){
            accountBalance += amount;
            await account.save({validateBeforeSave:false});
        }
        if(transactionType === "Withdraw"){
            accountBalance -= amount;
            await account.save({validateBeforeSave:false});
        }

        const newTransaction = await Transaction.create({ member: id ,account : accountId,
            amount, transactionType, transactionDate : new Date(), transactionStatus : "Completed",
            transactionApprovalStatus: "Approved"
        });

        if(newTransaction){
            return res.status(200).json(newTransaction);
        }
        
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    makeTransaction
}