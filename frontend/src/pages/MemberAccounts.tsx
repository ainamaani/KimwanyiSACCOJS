import { Typography,CircularProgress, TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { LockOpenOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface MemberAccount{
    _id:string,
    member:{
        _id:string,
        firstName:string,
        lastName:string,
        email:string
    },
    accountNumber:string,
    accountBalance:number,
    openingDate:Date,
    closingDate:Date,
    accountStatus:string
}

const MemberAccounts = ():JSX.Element => {
    const [memberAccounts, setMemberAccounts] = useState<MemberAccount[] | null>(null);
    const [page,setPage] = useState<number>(0); //current page
    const [rowsPerPage,setRowsPerPage] = useState<number>(5); //Rows per page
    const [isFreezeDialogOpen,setIsFreezeDialogOpen] = useState<boolean>(false);
    const [accountToFreeze,setAccountToFreeze] = useState<string | null>(null);

    // fetch accounts
    useEffect(()=>{
        const fetchMemberAccounts = async() =>{
            try {
                const memberAccountsData = await axios.get('http://localhost:4343/api/accounts/');
                if(memberAccountsData.status === 200){
                    const data : MemberAccount[] = memberAccountsData.data;
                    setMemberAccounts(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchMemberAccounts();
    },[memberAccounts]);

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, newPage:number) =>{
        setPage(newPage);
    }

    const handleChangeRowsPage = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0); //Reset to the first page when changing rows per page
    }

    // Function to handle opening of the dialog
     const handleOpenFreezeDialog = (accountId : string) =>{
        setAccountToFreeze(accountId);
        setIsFreezeDialogOpen(true);
    } 

    // Function to handle closing of the dialog
    const handleCloseFreezeDialog = () =>{
        setAccountToFreeze(null);
        setIsFreezeDialogOpen(false);
    }

    // function to freeze account
    const handleFreezeAccount = async(accountToFreeze : string | null) =>{
        try {
            const freezeAccount = await axios.get(`http://localhost:4343/api/accounts/freeze/${accountToFreeze}`);
            if(freezeAccount.status === 200){
                console.log(freezeAccount);
                handleCloseFreezeDialog();
                toast.success("Account frozen successfully",{
                    position: "top-right"
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to feeze account",{
                position: "top-right"
            })
        }
    }

    return (
        <div>
            <Typography>Member accounts</Typography>
            { memberAccounts ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Member</TableCell>
                                <TableCell>Account Number</TableCell>
                                <TableCell>Account Balance</TableCell>
                                <TableCell>Opening date</TableCell>
                                <TableCell>Account status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                            memberAccounts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((account : MemberAccount) =>(
                                    <TableRow>
                                        <TableCell>{account.member.firstName + " "}{account.member.lastName}</TableCell>
                                        <TableCell>{account.accountNumber}</TableCell>
                                        <TableCell>{account.accountBalance}</TableCell>
                                        <TableCell>{account.openingDate ? new Date(account.openingDate).toLocaleDateString() : ''}</TableCell>
                                        <TableCell>{account.accountStatus}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Freeze account">
                                                <IconButton
                                                    color="primary" size="large"
                                                    onClick={()=>{ handleOpenFreezeDialog(account._id)}}
                                                >
                                                    <LockOpenOutlined />
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
                        count={memberAccounts.length}
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
                open={isFreezeDialogOpen}
                onClose={handleCloseFreezeDialog}
            >
                <DialogTitle>Freeze Account</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Are you sure you want to freeze the account?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary" variant="contained"
                        onClick={handleCloseFreezeDialog}
                    >
                        Close
                    </Button>
                    <Button
                        color="primary" variant="contained"
                        onClick={()=>{handleFreezeAccount(accountToFreeze)}}
                    >
                        Freeze
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
 
export default MemberAccounts;