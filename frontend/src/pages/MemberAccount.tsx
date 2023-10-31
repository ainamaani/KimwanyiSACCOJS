import { Card, CardContent, CircularProgress, Icon, Typography } from "@mui/material";
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

const MemberAccount = ():JSX.Element => {

    const {member} = useAuthContext();
    const [accountData, setAccountData] = useState<Account | null>(null);
    
    useEffect(()=>{
        const fetchMemberAccountData = async() =>{
            try {
                const memberAccountData = await axios.get(`http://localhost:4343/api/accounts/member/${member.id}`);
                if(memberAccountData.status === 200){
                    const data : Account = memberAccountData.data;
                    setAccountData(data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchMemberAccountData();
    },[member]);

    useEffect(()=>{
        console.log(accountData)
    },[accountData]);

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
        </div>
     );
}
 
export default MemberAccount;