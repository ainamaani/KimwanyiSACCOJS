
const makeTransaction = async(req,res) =>{
    const { amount,transactionType,transactionDate,transactionStatus,
        transactionApprovalStatus } = req.body;

        if(amount < 5000){
            return res.status(400).json({ error: "The minimum amount of money you can transact is 5000 UGx" })
        }

        try {
            
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
}

module.exports = {
    makeTransaction
}