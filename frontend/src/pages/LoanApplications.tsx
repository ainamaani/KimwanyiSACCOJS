import { Button, Dialog, DialogActions, DialogContent, DialogTitle, 
    IconButton, Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TablePagination, TableRow, Tooltip, Typography,CircularProgress } from "@mui/material";
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { VisibilityRounded } from "@mui/icons-material";


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
    requestStatus:string
}


const LoanApplications = ():JSX.Element => {

    const [loanRequests, setLoanRequests] = useState<LoanRequest[] | null>(null);
    const [page,setPage] = useState<number>(0); //current page
    const [rowsPerPage,setRowsPerPage] = useState<number>(5); //Rows per page
    const [isViewDialogOpen,setIsViewDialogOpen] = useState<boolean>(false);
    const [loanRequestToView,setLoanRequestToView] = useState<LoanRequest | null>(null);


    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, newPage:number) =>{
        setPage(newPage);
    }

    const handleChangeRowsPage = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0); //Reset to the first page when changing rows per page
    }

    // Function to handle opening of the dialog
    const handleOpenViewDialog = (loanRequest : LoanRequest) =>{
        setLoanRequestToView(loanRequest);
        setIsViewDialogOpen(true);
    } 

    // Function to handle closing of the dialog
    const handleCloseViewDialog = () =>{
        setLoanRequestToView(null);
        setIsViewDialogOpen(false);
    }

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
                                <TableCell>Request Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loanRequests
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((loanRequested : LoanRequest)=>(
                                        <TableRow key={loanRequested._id}>
                                            <TableCell>{loanRequested.member.firstName + " "}{loanRequested.member.lastName}</TableCell>
                                            <TableCell>{loanRequested.amountRequested}</TableCell>
                                            <TableCell>{loanRequested.loanType}</TableCell>
                                            <TableCell>{loanRequested.prefferedPaymentSchedule}</TableCell>
                                            <TableCell>{loanRequested.monthlyIncome}</TableCell>
                                            <TableCell>{loanRequested.requestStatus}</TableCell>
                                            <TableCell>
                                                <Tooltip title="View Loan request details">
                                                    <IconButton color="primary" size="large"
                                                                onClick={()=>{handleOpenViewDialog(loanRequested)}}
                                                    >
                                                        <VisibilityRounded />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            }
                        </TableBody>
                    </Table>
                    <TablePagination 
                        rowsPerPageOptions={[5,10,20]}
                        component='div'
                        count={loanRequests.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPage}
                    />
                </TableContainer>
            ):(
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <CircularProgress />
                </div>
            )}
            <Dialog
                open={isViewDialogOpen}
                onClose={handleCloseViewDialog}
                PaperProps={{
                    style:{
                        width: '800px'
                    }
                }}
            >
                <DialogTitle>Requested Loan Details</DialogTitle>
                <DialogContent>
                    { loanRequestToView && (
                        <>
                            <Typography variant="body1">
                            <strong>Amount Requested:</strong> {loanRequestToView.amountRequested}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Preffered Payment Schedule:</strong> {loanRequestToView.prefferedPaymentSchedule}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Loan purpose:</strong> {loanRequestToView.loanPurpose}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Loan Type:</strong> {loanRequestToView.loanType}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Monthly Income:</strong> {loanRequestToView.monthlyIncome}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Other sources of income:</strong> {loanRequestToView.otherSourcesOfIncome}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Guarantor:</strong> {loanRequestToView.guarantorName}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Guarantor Email:</strong> {loanRequestToView.guarantorEmail}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Guarantor Phone number:</strong> {loanRequestToView.guarantorPhoneNumber}
                            </Typography>
                     </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={handleCloseViewDialog}
                    variant="contained" color="primary">Close</Button>
                </DialogActions>
            </Dialog>

        </div>
     );
}
 
export default LoanApplications;