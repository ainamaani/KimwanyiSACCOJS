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
            accountId = account._id;

            if(transactionType === "Deposit"){
                account.accountBalance += amount;
            }else if(transactionType === "Withdraw"){
                account.accountBalance -= amount;
            }

            await account.save();

            const newTransaction = await Transaction.create({ member: id ,account : accountId,
                amount, transactionType, transactionDate : new Date(), transactionStatus : "Completed",
                transactionApprovalStatus: "Approved"
            });
    
            if(newTransaction){
                return res.status(200).json(newTransaction);
            }
            
        }else{
            return res.status(400).json({ error: "Account not found" });
        }   
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getTransactions = async(req,res) =>{
    try {
        const allTransactions = await Transaction.find({}).populate('member').populate('account');
        if(allTransactions){
            return res.status(200).json(allTransactions);
        }else{
            return res.status(400).json({ error: "Failed to fetch all transactions" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getMemberTransactions = async(req,res) =>{
    const {id} = req.params;
    try {
        const memberTransactions = await Transaction.find({ member: id }).sort({ createdAt: -1 });
        if(memberTransactions){
            return res.status(200).json(memberTransactions);
        }else{
            return res.status(400).json({ error: "Failed to retrieve transactions for the member" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    makeTransaction,
    getTransactions,
    getMemberTransactions
}