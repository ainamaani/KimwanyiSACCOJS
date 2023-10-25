import { Typography,TextField,Button } from "@mui/material";
import React,{useState, useEffect} from 'react';
import { styled } from "@mui/styles";

const StyledTextField = styled(TextField)({
    marginTop: '20px',
    marginBottom: '20px',
    display: 'block'
})

const StyledButton = styled(Button)({
    marginTop: '20px',
    marginBottom: '20px',
    display: 'block'
})


const LoanRequest = ():JSX.Element => {
    const [amountRequested,setAmountRequested] = useState<string>('');
    const [prefferedPaymentSchedule,setPrefferedPaymentSchedule] = useState<string>('');
    return ( 
        <div>
            <Typography variant="body1">Request loan</Typography>
            <StyledTextField 
                label="Loan amount"
                variant="outlined"
                fullWidth required
            />
        </div>
     );
}
 
export default LoanRequest;