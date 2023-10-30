import { Typography,TextField,Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { styled } from "@mui/system";
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import useAuthContext from "../hooks/UseAuthContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Transactions = ():JSX.Element => {
    const minAmount = 5000;
    const {member} = useAuthContext();
    const [transactionType, setTransactionType] = useState<string>('');
    const [amount, setAmount] = useState<number | null>(null);
    const [error, setError] = useState<string>('');

    const handleMakeTransaction = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(transactionType, amount);
        const transactionData = { transactionType, amount }

        try {
            const transaction = await axios.post(`http://localhost:4343/api/transactions/maketransaction/${member.id}`,
                                JSON.stringify(transactionData),
                                {
                                    headers:{
                                        'Content-Type':'application/json'
                                    }
                                }
            )
            if(transaction.status === 200){
                console.log(transaction);
                setAmount(0);
                setTransactionType('');
                toast.success("Transaction made successfully",{
                    position: "top-right"
                });
            }
        } catch (error : any) {
            if(error.response && error.response.data && error.response.data.error){
                // set error is state
                setError(error.response.data.error);
            }
            toast.error("Transaction failed!!",{
                position: "top-right"
            })
        }
    }

    return ( 
        <div>
            <Typography variant="h5">Make a transaction</Typography>
            <form autoComplete="off" noValidate onSubmit={handleMakeTransaction}>
                <RadioGroup value={transactionType} onChange={(e)=>{setTransactionType(e.target.value)}}>
                    <FormControlLabel value="Deposit" control={<Radio />} label="Deposit"/>
                    <FormControlLabel value="Withdraw" control={<Radio />} label="Withdraw"/>
                    <FormControlLabel value="Internal Transfer" control={<Radio />} label="Internal Transfer"/>
                </RadioGroup>
                <TextField 
                required fullWidth
                label="Amount in UGx to transact"
                type="number"
                variant="outlined"
                value={amount}
                inputProps={{
                    min: minAmount
                }} 
                sx={{marginTop: 2, 
                    marginBottom: 2, 
                    width: 800,

                 }}
                onChange={(e)=>{
                    const enteredAmount = e.target.value;
                    const formattedAmount = enteredAmount ? parseFloat(enteredAmount) : null
                    setAmount(formattedAmount);
                }}
                />
                <Button 
                type="submit" variant="contained"
                sx={{marginTop: 2, 
                    marginBottom: 2, 
                    display: 'block'
                    
                 }}
                >Make Transaction</Button>
                { error && <span style={{color:"red"}}>{error}</span> }
            </form>
        </div>
     );
}
 
export default Transactions;