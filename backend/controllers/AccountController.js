const Account = require('../models/Account');

const getAccounts = async(req,res) =>{
    try {
        const accounts = await Account.find({}).sort({ createdAt:-1 }).populate('member');
        if(accounts){
            return res.status(200).json(accounts);
        }else{
            return res.status(400).json({ error: "Could not fetch the accounts" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getMemberAccountData = async(req,res) =>{
    const {id} = req.params;
    try {
        const memberAccountData = await Account.findOne({ member: id }).populate('member');
        if(memberAccountData){
            return res.status(200).json(memberAccountData);
        }else{
            return res.status(400).json({ error: "Failed to fetch account details for the member" });
        }

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const freezeAccount = async(req,res) =>{
    const {id} = req.params;
    try {
        const accountToFreeze = await Account.findById(id);
        if(accountToFreeze){
            accountToFreeze.accountStatus = "Frozen";
            await accountToFreeze.save({ validateBeforeSave:false });
            return res.status(200).json(accountToFreeze);
        }else{
            return res.status(400).json({ error: "Failed to get account to freeze" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const unFreezeAccount = async(req,res) =>{
    const {id} = req.params;
    try {
        const accountToUnfreeze = await Account.findById(id);
        if(accountToUnfreeze){
            accountToUnfreeze.accountStatus = "Active";
            await accountToUnfreeze.save({ validateBeforeSave:false })
            return res.status(200).json(accountToUnfreeze);
        }else{
            return res.status(400).json({ error: "Failed to fetch the account to unfreeze" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAccounts,
    getMemberAccountData,
    freezeAccount,
    unFreezeAccount
}