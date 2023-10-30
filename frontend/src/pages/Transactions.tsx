import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import React,{useState, useEffect} from 'react';
import axios from 'axios';

interface Transaction{
    member:{
        _id:string,
        firstName:string,
        lastName:string,
        email:string
    },
    account:{
        _id:string,
        accountNumber:string
    },
    amount:number,
    transactionType:string,
    transactionDate:Date,
    transactionStatus:string,
    transactionApprovalStatus:string
}


const ViewTransactions = ():JSX.Element => {

    const [transactions, setTransactions] = useState<Transaction[] | null>(null);
    const [page,setPage] = useState<number>(0); //current page
    const [rowsPerPage,setRowsPerPage] = useState<number>(5); //Rows per page

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, newPage:number) =>{
        setPage(newPage);
    }

    const handleChangeRowsPage = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0); //Reset to the first page when changing rows per page
    }

    useEffect(()=>{
        const fetchTransactions = async() =>{
            try {
                const fetchedTransactions = await axios.get('http://localhost:4343/api/transactions');

                if(fetchedTransactions.status === 200){
                    const data : Transaction[] = fetchedTransactions.data;
                    setTransactions(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchTransactions();
    },[transactions])
    return ( 
        <div>
            <Typography variant="h5">Transactions</Typography>
            { transactions ? (
                 <TableContainer component={Paper}>
                 <Table>
                     <TableHead>
                         <TableRow>
                             <TableCell>Member</TableCell>
                             <TableCell>Account number</TableCell>
                             <TableCell>Amount transacted(UGx)</TableCell>
                             <TableCell>Transaction type</TableCell>
                             <TableCell>Date of transaction</TableCell>
                             <TableCell>Transaction Status</TableCell>
                             <TableCell>Transaction Approval Status</TableCell>
                         </TableRow>
                     </TableHead>
                     <TableBody>
                         { 
                             transactions.map((transaction : Transaction) =>(
                                 <TableRow>
                                     <TableCell>{transaction.member.firstName + " "}{transaction.member.lastName}</TableCell>
                                     <TableCell>{transaction.account.accountNumber}</TableCell>
                                     <TableCell>{transaction.amount}</TableCell>
                                     <TableCell>{transaction.transactionType}</TableCell>
                                     <TableCell>{transaction.transactionDate ? new Date(transaction.transactionDate).toLocaleDateString() : ''}</TableCell>
                                     <TableCell>{transaction.transactionStatus}</TableCell>
                                     <TableCell>{transaction.transactionApprovalStatus}</TableCell>
                                 </TableRow>
                             ))
                         }
                     </TableBody>
                 </Table>
                 <TablePagination 
                    rowsPerPageOptions={[5,10,20]}
                    component='div'
                    count={transactions.length}
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
        </div>
     );
}
 
export default ViewTransactions;