import { Paper, Table, TableCell, TableContainer, 
    TableHead, TableRow, Typography, CircularProgress, TableBody, Tooltip, 
    IconButton, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import React,{useState,useEffect} from 'react';
import useAuthContext from "../hooks/UseAuthContext";
import axios from "axios";
import { VisibilityRounded } from "@mui/icons-material";

interface Loan{
    _id:string,
    member:{
        _id:string,
        firstName:string,
        lastName:string,
        email:string
    },
    amountRequested:string,
    prefferedPaymentSchedule:string,
    loanPurpose:string,
    loanType:string,
    monthlyIncome:string,
    otherSourcesOfIncome:string,
    guarantorName:string,
    guarantorEmail:string,
    guarantorPhoneNumber:string,
    requestStatus:string
}

const Loans = ():JSX.Element => {
    const { member } = useAuthContext();
    const [loans,setLoans] = useState<Loan[] | null>(null);
    const [page,setPage] = useState<number>(0); //current page
    const [rowsPerPage,setRowsPerPage] = useState<number>(5); //Rows per page
    const [isViewDialogOpen,setIsViewDialogOpen] = useState<boolean>(false);
    const [loanToView,setLoanToView] = useState<Loan | null>(null);


    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, newPage:number) =>{
        setPage(newPage);
    }

    const handleChangeRowsPage = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0); //Reset to the first page when changing rows per page
    }

    // Function to handle opening of the dialog
    const handleOpenViewDialog = (loan : Loan) =>{
        setLoanToView(loan);
        setIsViewDialogOpen(true);
    } 

    // Function to handle closing of the dialog
    const handleCloseViewDialog = () =>{
        setLoanToView(null);
        setIsViewDialogOpen(false);
    }


    useEffect(()=>{
        const fetchApprovedLoans = async() => {
            try {
                const approvedLoans = await axios.get('http://localhost:4343/api/loans/givenloans',{
                    headers:{
                        'Authorization':`Bearer ${member.token}`
                    }
                });
                if(approvedLoans.status === 200){
                    const approvedLoansData : Loan[] = approvedLoans.data;
                    setLoans(approvedLoansData);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if(member){
            fetchApprovedLoans();
        }
    },[])

    return ( 
        <div>
            <Typography variant="h5">Loans</Typography>
            { loans ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Member</TableCell>
                                <TableCell>Amount taken</TableCell>
                                <TableCell>Loan type</TableCell>
                                <TableCell>Preffered Payment Schedule</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        { loans
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((loan : Loan) => (
                                <TableRow>
                                    <TableCell>{loan.member.firstName + " "}{loan.member.lastName}</TableCell>
                                    <TableCell>{loan.amountRequested}</TableCell>
                                    <TableCell>{loan.loanType}</TableCell>
                                    <TableCell>{loan.prefferedPaymentSchedule}</TableCell>
                                    <TableCell>
                                        <Tooltip title="View loan details">
                                            <IconButton 
                                            color="primary" size="large"
                                            onClick={()=>{handleOpenViewDialog(loan)}}
                                            >
                                                <VisibilityRounded />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            )) }
                        </TableBody>
                    </Table>
                    <TablePagination 
                        rowsPerPageOptions={[5,10,20]}
                        component='div'
                        count={loans.length}
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
            {/* View loan dialog */}
            <Dialog
                open={isViewDialogOpen}
                onClose={handleCloseViewDialog}
                PaperProps={{
                    style:{
                        width: '800px'
                    }
                }}
            >
                <DialogTitle>Loan Details</DialogTitle>
                <DialogContent>
                    { loanToView && (
                        <>
                            <Typography variant="body1">
                            <strong>Amount Requested:</strong> {loanToView.amountRequested}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Preffered Payment Schedule:</strong> {loanToView.prefferedPaymentSchedule}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Loan purpose:</strong> {loanToView.loanPurpose}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Loan Type:</strong> {loanToView.loanType}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Monthly Income:</strong> {loanToView.monthlyIncome}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Other sources of income:</strong> {loanToView.otherSourcesOfIncome}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Guarantor:</strong> {loanToView.guarantorName}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Guarantor Email:</strong> {loanToView.guarantorEmail}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Guarantor Phone number:</strong> {loanToView.guarantorPhoneNumber}
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
 
export default Loans;