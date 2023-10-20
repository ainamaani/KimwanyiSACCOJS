import { Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Typography, TablePagination } from "@mui/material";
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
    const [page,setPage] = useState<number>(0); //current page
    const [rowsPerPage,setRowsPerPage] = useState<number>(5); //Rows per page

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

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, newPage:number) =>{
        setPage(newPage);
    }

    const handleChangeRowsPage = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0); //Reset to the first page when changing rows per page
    }

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
                            { members
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((member : Member) =>(
                                <TableRow key={member._id}>
                                    <TableCell>{member.firstName}</TableCell>
                                    <TableCell>{member.lastName}</TableCell>
                                    <TableCell>{member.gender}</TableCell>
                                    <TableCell>{member.employmentStatus}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination 
                        rowsPerPageOptions={[5,10,20]}
                        component="div"
                        count={members.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPage}

                    />
                </TableContainer>
            ):(
                <Typography variant="h5" >Loading...</Typography>
            )}
        </div>
    );
}
 
export default Members;