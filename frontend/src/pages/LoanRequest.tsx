import { Typography,TextField,Button,RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React,{useState} from 'react';
import { styled } from "@mui/styles";
import axios from "axios";
import useAuthContext from "../hooks/UseAuthContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const StyledTextField = styled(TextField)({
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
});

const StyledButton = styled(Button)({
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
});
const StyledRadioGroup = styled(RadioGroup)({
    marginTop: 20,
    marginBottom: 20
})


const LoanRequest = ():JSX.Element => {
    const {member} = useAuthContext();

    const [amountRequested,setAmountRequested] = useState<string>('');
    const [prefferedPaymentSchedule,setPrefferedPaymentSchedule] = useState<string>('');
    const [loanPurpose,setLoanPurpose] = useState<string>('');
    const [loanType,setLoanType] = useState<string>('');
    const [monthlyIncome,setMonthlyIncome] = useState<string>('');
    const [otherSourcesOfIncome,setOtherSourcesOfIncome] = useState<string>('');
    const [guarantorName,setGuarantorName] = useState<string>('');
    const [guarantorEmail,setGuarantorEmail] = useState<string>('');
    const [guarantorPhoneNumber,setGuarantorPhoneNumber] = useState<string>('');
    const [errors,setErrors] = useState<Record<string,string>>({});

    const handleLoanRequest = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(amountRequested,prefferedPaymentSchedule,loanPurpose,loanType,monthlyIncome,
                    otherSourcesOfIncome,guarantorName,guarantorEmail,guarantorPhoneNumber);

        try {
            const response = await axios.post(`http://localhost:4343/api/loans/request/${member.email}`,
                                JSON.stringify({ amountRequested,prefferedPaymentSchedule,loanPurpose,loanType,monthlyIncome,
                                    otherSourcesOfIncome,guarantorName,guarantorEmail,guarantorPhoneNumber }),{
                                        headers:{
                                            'Content-Type':'application/json'
                                        }
                                    }
            );
            setErrors({});
            if(response.status === 200){
                console.log(response.data);
                setAmountRequested('');
                setGuarantorEmail('');
                setMonthlyIncome('');
                setPrefferedPaymentSchedule('');
                setLoanPurpose('');
                setOtherSourcesOfIncome('');
                setGuarantorName('');
                setGuarantorPhoneNumber('');
                setLoanType('');

                // show success message
                toast.success("Load request successful",{
                    position: "top-right"
                })
                
            }
        } catch (error : any) {
            if(error.response && error.response.data && error.response.data.errors){
                // set errors in the state
                setErrors(error.response.data.errors);
            }

            toast.error("Loan request failed",{
                position: "top-right"
            })
        }
    }

    return ( 
        <div>
            <Typography variant="body1">Request loan</Typography>
            <form noValidate autoComplete="off" onSubmit={handleLoanRequest}>
                <StyledTextField 
                    label="Loan amount"
                    variant="outlined"
                    fullWidth required
                    value={amountRequested}
                    onChange={(e)=>{setAmountRequested(e.target.value)}}
                    style={{marginTop:20,marginBottom:20}}
                />
                { errors.amountRequested && (
                    <span style={{color:"red"}}>{errors.amountRequested}</span>
                )}
                <Typography variant="body1">Preffered payment schedule</Typography>
                <StyledRadioGroup value={prefferedPaymentSchedule} onChange={(e)=>{setPrefferedPaymentSchedule(e.target.value)}}>
                    <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />
                    <FormControlLabel value="Quarterly" control={<Radio />} label="Quarterly" />
                    <FormControlLabel value="Yearly" control={<Radio />} label="Yearly" />
                </StyledRadioGroup>
                { errors.prefferedPaymentSchedule && (
                    <span style={{color:"red"}}>{errors.prefferedPaymentSchedule}</span>
                )}
                <StyledTextField 
                    label="Loan purpose"
                    variant="outlined"
                    fullWidth required
                    value={loanPurpose}
                    rows={5}
                    onChange={(e)=>{setLoanPurpose(e.target.value)}}
                />
                { errors.loanPurpose && (
                    <span style={{color:"red"}}>{errors.loanPurpose}</span>
                )}
                <StyledTextField 
                    label="Loan Type"
                    variant="outlined"
                    fullWidth required
                    value={loanType}
                    onChange={(e)=>{setLoanType(e.target.value)}}
                />
                { errors.loanType && (
                    <span style={{color:"red"}}>{errors.loanType}</span>
                )}
                <StyledTextField 
                    label="Monthly Income"
                    variant="outlined"
                    fullWidth required
                    value={monthlyIncome}
                    onChange={(e)=>{setMonthlyIncome(e.target.value)}}
                />
                { errors.monthlyIncome && (
                    <span style={{color:"red"}}>{errors.monthlyIncome}</span>
                )}
                <StyledTextField 
                    label="Other sources of income(if any)"
                    variant="outlined"
                    fullWidth
                    value={otherSourcesOfIncome}
                    onChange={(e)=>{setOtherSourcesOfIncome(e.target.value)}}
                />
                <StyledTextField 
                    label="Guarantor Name"
                    variant="outlined"
                    fullWidth required
                    value={guarantorName}
                    onChange={(e)=>{setGuarantorName(e.target.value)}}
                />
                { errors.guarantorName && (
                    <span style={{color:"red"}}>{errors.guarantorName}</span>
                )}
                <StyledTextField 
                    label="Guarantor Email"
                    variant="outlined"
                    fullWidth required
                    value={guarantorEmail}
                    onChange={(e)=>{setGuarantorEmail(e.target.value)}}
                />
                { errors.guarantorEmail && (
                    <span style={{color:"red"}}>{errors.guarantorEmail}</span>
                )}
                <StyledTextField 
                    label="Guarantor Phone Number"
                    variant="outlined"
                    fullWidth required
                    value={guarantorPhoneNumber}
                    onChange={(e)=>{setGuarantorPhoneNumber(e.target.value)}}
                />
                { errors.guarantorPhoneNumber && (
                    <span style={{color:"red"}}>{errors.guarantorPhoneNumber}</span>
                )}
                <StyledButton type="submit" variant="contained">Request Loan</StyledButton>
            </form>
        </div>
     );
}
 
export default LoanRequest;