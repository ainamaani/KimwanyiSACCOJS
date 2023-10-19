import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React,{ useState,useEffect } from 'react';
import axios from 'axios';

interface Member{
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
}



const Members = ():JSX.Element => {
    const [members,setMembers] = useState<Member[] | null>(null);

    useEffect(()=>{
        const fetchApprovedMembers = async() =>{
            try {
                const approvedMembers = await axios.get('http://localhost:4343/api/members/approvedmembers');
                if(approvedMembers.status === 200){
                    const membersApproved: Member[] = approvedMembers.data;
                    setMembers(membersApproved);
                }
            } catch (error) {
                console.log(error)
            }

        }
        fetchApprovedMembers();
    },[members]);
    return (  
        <div>
            <Typography variant="h5">SACCO members</Typography>
            { members ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Employment Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { members.map((member : Member) =>(
                                <TableRow key={member._id}>
                                    <TableCell>{member.firstName}</TableCell>
                                    <TableCell>{member.lastName}</TableCell>
                                    <TableCell>{member.gender}</TableCell>
                                    <TableCell>{member.employmentStatus}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ):(
                <Typography variant="h5" >Loading...</Typography>
            )}
        </div>
    );
}
 
export default Members;