import { Card, CardContent, CircularProgress, Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import useAuthContext from "../hooks/UseAuthContext";
import { AccountBalanceOutlined } from "@mui/icons-material";

interface Account{
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

interface Transaction{
    _id:string,
    member:{
        _id:string,
        firstName:string,
        lastName:string,
        email:string
    },
    amount:number,
    transactionType:string,
    transactionDate:Date,
    transactionStatus:string,
    transactionApprovalStatus:string
}

const MemberAccount = ():JSX.Element => {

    const {member} = useAuthContext();
    const [page,setPage] = useState<number>(0); //current page
    const [rowsPerPage,setRowsPerPage] = useState<number>(5); //Rows per page
    const [accountData, setAccountData] = useState<Account | null>(null);
    const [transactionData, setTransactionData] = useState<Transaction[] | null>(null);
    
    useEffect(()=>{
        const fetchMemberAccountData = async() =>{
            try {
                const memberAccountData = await axios.get(`http://localhost:4343/api/accounts/member/${member.id}`);
                if(memberAccountData.status === 200){
                    const data : Account = memberAccountData.data;
                    setAccountData(data);
                }

                const memberTransactionData = await axios.get(`http://localhost:4343/api/transactions/member/${member.id}`);
                if(memberTransactionData.status === 200){
                    const transData : Transaction[] = memberTransactionData.data;
                    setTransactionData(transData);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchMemberAccountData();
    },[member]);

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, newPage:number) =>{
        setPage(newPage);
    }

    const handleChangeRowsPage = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0); //Reset to the first page when changing rows per page
    }

    return ( 
        <div>
            
            <Typography>Member account data</Typography>
            <Typography>Hello, {accountData?.member.firstName}</Typography>
            { accountData ? (
               <Card>
                <CardContent>
                    <Typography variant="h5">
                        <Icon component={AccountBalanceOutlined} sx={{ fontSize:30 }} color="primary"/> Account balance: {accountData.accountBalance}
                    </Typography>
                </CardContent>
               </Card>
            ):(
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <CircularProgress />
                </div>
            )}

            <Typography>Transaction Statements</Typography>
            {
                transactionData ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Amount transacted(UGx)</TableCell>
                                    <TableCell>Transaction type</TableCell>
                                    <TableCell>Transaction date</TableCell>
                                    <TableCell>Transaction status</TableCell>
                                    <TableCell>Trnsaction Approval status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { transactionData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((transc : Transaction) => (
                                    <TableRow>
                                        <TableCell>{transc.amount}</TableCell>
                                        <TableCell>{transc.transactionType}</TableCell>
                                        <TableCell>{transc.transactionDate ? new Date(transc.transactionDate).toLocaleDateString() : ''}</TableCell>
                                        <TableCell>{transc.transactionStatus}</TableCell>
                                        <TableCell>{transc.transactionApprovalStatus}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination 
                            rowsPerPageOptions={[5,10,20]}
                            component="div"
                            count={transactionData.length}
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
                )
            }
        </div>
     );
}
 
export default MemberAccount;