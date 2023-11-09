import { Button, Dialog, DialogActions, DialogContent, DialogTitle, 
    IconButton, Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TablePagination, TableRow, Tooltip, Typography,CircularProgress } from "@mui/material";
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { CancelOutlined, CheckCircleOutlineOutlined, VisibilityRounded } from "@mui/icons-material";
import useAuthContext from "../hooks/UseAuthContext";
import { toast } from "react-toastify";
import LoanRequest from "./LoanRequest";

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
    const [isApproveLoanDialogOpen,setIsApproveLoanDialogOpen] = useState<boolean>(false);
    const [loanRequestToApprove,setLoanRequestToApprove] = useState<string | null>(null);
    const [isDeclineLoanDialogOpen,setIsDeclineLoanDialogOpen] = useState<boolean>(false);
    const [loanRequestToDecline,setLoanRequestToDecline] = useState<string | null>(null);
    const [isViewDialogOpen,setIsViewDialogOpen] = useState<boolean>(false);
    const [loanRequestToView,setLoanRequestToView] = useState<LoanRequest | null>(null);
    const [loanAmount, setLoanAmount] = useState<string | null>(null);

    const {member} = useAuthContext();


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

    // Function to handle opening of the dialog
    const handleOpenApproveLoanDialog = (loanId : string) =>{
        setLoanRequestToApprove(loanId);
        setIsApproveLoanDialogOpen(true);
    } 

    // Function to handle closing of the dialog
    const handleCloseApproveLoanDialog = () =>{
        setLoanRequestToApprove(null);
        setIsApproveLoanDialogOpen(false);
        setLoanAmount(null);
    }

    // Function to handle opening of the dialog
    const handleOpenDeclineLoanDialog = (loanId : string) =>{
        setLoanRequestToDecline(loanId);
        setIsDeclineLoanDialogOpen(true);
    } 

    // Function to handle closing of the dialog
    const handleCloseDeclineLoanDialog = () =>{
        setLoanRequestToDecline(null);
        setIsDeclineLoanDialogOpen(false);
    }

    const handleApproveLoanRequest = async(loanRequestToApprove : string | null, loanAmount: string | null) =>{
        if(!member){
            return;
        }
        if(loanRequestToApprove !== null && loanAmount !== null){
            try {
                const approveLoanRequest = await axios.post(`http://localhost:4343/api/loans/approverequest/${loanRequestToApprove}`,
                { loanAmount:loanAmount },{
                    headers:{
                        'Authorization':`Bearer ${member.token}`
                    }
                });
                if(approveLoanRequest.status === 200){
                    console.log(approveLoanRequest.data);
                    handleCloseApproveLoanDialog();
                    toast.success("Loan request approved successfully!!",{
                        position: "top-right"
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error("Loan request approval failed!!",{
                    position: "top-right"
                });
            }
        }
    }

    useEffect(()=>{
        console.log("Amount", loanAmount)
    },[loanAmount]);
    // function to decline loan request
    const handleDeclineLoanRequest = async(loanRequestToDecline : string | null) =>{
        
        if(loanRequestToDecline !== null){
            try {
                const declineLoanRequest = await axios.get(`http://localhost:4343/api/loans/declinerequest/${loanRequestToDecline}`,{
                    headers:{
                        'Authorization':`Bearer ${member.token}`
                    }
                });
                if(declineLoanRequest.status === 200){
                    console.log(declineLoanRequest.data);
                    handleCloseDeclineLoanDialog();
                    toast.success("Loan request declined successfully!!",{
                        position: "top-right"
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error("Loan request declining failed!!",{
                    position: "top-right"
                });
            }
        }
    }

    // fetch the loan requests
    useEffect(()=>{
        const fetchLoanRequests = async() =>{
            try {
                const requestsForLoans =  await axios.get('http://localhost:4343/api/loans/requests',{
                    headers:{
                        'Authorization' : `Bearer ${member.token}`
                    }
                });
                if(requestsForLoans.status === 200){
                    const requestedLoans : LoanRequest[]  = requestsForLoans.data;
                    setLoanRequests(requestedLoans);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if(member){
            fetchLoanRequests();
        }
    },[loanRequests, member]);

    
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
                                            <TableCell>{loanRequested.requestStatus}</TableCell>
                                            <TableCell>
                                                <Tooltip title="View Loan request details">
                                                    <IconButton color="primary" size="large"
                                                                onClick={()=>{handleOpenViewDialog(loanRequested)}}
                                                    >
                                                        <VisibilityRounded />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Approve Loan request">
                                                    <IconButton color="success" size="large"
                                                                onClick={()=>{
                                                                    handleOpenApproveLoanDialog(loanRequested._id);
                                                                    setLoanAmount(loanRequested.amountRequested);
                                                                }}
                                                    >
                                                        <CheckCircleOutlineOutlined />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Decline Loan request">
                                                    <IconButton color="error" size="large"
                                                                onClick={()=>{handleOpenDeclineLoanDialog(loanRequested._id)}}
                                                    >
                                                        <CancelOutlined />
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
            {/* Approve loan request */}
            <Dialog
                open={isApproveLoanDialogOpen}
                onClose={handleCloseApproveLoanDialog}
            >
                <DialogTitle>Approve Loan request</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to approve this loan request?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleCloseApproveLoanDialog}
                        variant="contained" color="primary">Close</Button>
                    <Button 
                        onClick={() => {handleApproveLoanRequest(loanRequestToApprove, loanAmount )}}
                        variant="contained" color="success">Approve Loan request</Button>
                </DialogActions>
            </Dialog>
            {/* Decline loan request */}
            <Dialog
                open={isDeclineLoanDialogOpen}
                onClose={handleCloseDeclineLoanDialog}
            >
                <DialogTitle>Decline Loan request</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to decline this loan request?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleCloseDeclineLoanDialog}
                        variant="contained" color="primary">Close</Button>
                    <Button 
                        onClick={() => {handleDeclineLoanRequest(loanRequestToDecline)}}
                        variant="contained" color="error">Decline Loan request</Button>
                </DialogActions>
            </Dialog>
            {/* View loan request dialog */}
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