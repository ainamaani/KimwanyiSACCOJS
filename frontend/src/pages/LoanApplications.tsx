import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React,{useState, useEffect} from 'react';
import axios from 'axios';


interface LoanRequest {
    _id:string,
    member: {
        _id:string,
        firstName:string,
        lastName:string,
        gender:string,
        dateOfBirth:Date,
        residentialAddress:string,
        email:string,
        phoneNumber:string,
        employmentStatus:string,
        currentOccupation:string,
        employerName:string,
        employerEmail:string,
        employerPhoneNumber:string,
        nextOfKin:string,
        nextOfKinEmail:string,
        nextOfKinPhoneNumber:string,
        membershipStatus:string
    },
    amountRequested:string,
    prefferedPaymentSchedule:string,
    loanPurpose:string,
    loanType:string,
    monthlyIncome:string,
    otherSourcesOfIncome:string,
    guarantorName:string,
    guarantorEmail:string,
    guarantorPhoneNumber:string
}


const LoanApplications = ():JSX.Element => {

    const [loanRequests, setLoanRequests] = useState<LoanRequest[] | null>(null);

    // fetch the loan requests
    useEffect(()=>{
        const fetchLoanRequests = async() =>{
            try {
                const requestsForLoans =  await axios.get('http://localhost:4343/api/loans/requests');
                if(requestsForLoans.status === 200){
                    const requestedLoans : LoanRequest[]  = requestsForLoans.data;
                    setLoanRequests(requestedLoans);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchLoanRequests();
    },[loanRequests])
    return ( 
        <div>
            <Typography variant="body1">Loan requests</Typography>
            { loanRequests ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Member</TableCell>
                                <TableCell>Amount requested</TableCell>
                                <TableCell>Loan Type</TableCell>
                                <TableCell>Preffered Payment Schedule</TableCell>
                                <TableCell>Monthly Income</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loanRequests.map((loanRequested : LoanRequest)=>(
                                    <TableRow key={loanRequested._id}>
                                        <TableCell>{loanRequested.member.firstName + " "}{loanRequested.member.lastName}</TableCell>
                                        <TableCell>{loanRequested.amountRequested}</TableCell>
                                        <TableCell>{loanRequested.loanType}</TableCell>
                                        <TableCell>{loanRequested.prefferedPaymentSchedule}</TableCell>
                                        <TableCell>{loanRequested.monthlyIncome}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            ):(
                <Typography>Loading....</Typography>
            )}

        </div>
     );
}
 
export default LoanApplications;