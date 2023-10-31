const Account = require('../models/Account');

const getAccounts = async(req,res) =>{
    try {
        const accounts = await Account.find({}).sort({ createdAt:-1 });
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

module.exports = {
    getAccounts,
    getMemberAccountData
}