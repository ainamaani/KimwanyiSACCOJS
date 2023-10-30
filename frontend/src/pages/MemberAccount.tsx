import { Typography } from "@mui/material";
import React,{useState,useEffect} from 'react';

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

    return ( 
        <Typography>Member account</Typography>
     );
}
 
export default MemberAccount;