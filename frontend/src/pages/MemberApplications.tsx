import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import { useEffect,useState } from "react";
import axios from "axios";
import useMemberApplicationContext from "../hooks/UseMemberApplicationContext";
import { CancelOutlined, CheckCircleOutlineOutlined, CheckCircleOutlineRounded, VisibilityRounded } from "@mui/icons-material";

interface Application{
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
    
}


const MemberApplications = ():JSX.Element => {

    const {applications, dispatch} = useMemberApplicationContext();

    const [page,setPage] = useState<number>(0); //current page
    const [rowsPerPage,setRowsPerPage] = useState<number>(5); //Rows per page

    useEffect(()=>{
        const fetchMemberApplications = async() =>{
            //try fetching member applications
            try {
                const applicationsFetched = await axios.get('http://localhost:4343/api/members');
                if(applicationsFetched.status === 200){
                    const applicationData: Application[] = applicationsFetched.data;
                    dispatch({ type:'SET_APPLICATIONS', payload:applicationData });
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchMemberApplications();

    },[dispatch,applications]);

    useEffect(()=>{
        console.log(applications);
    },[]);

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, newPage:number) =>{
        setPage(newPage);
    }

    const handleChangeRowsPage = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0); //Reset to the first page when changing rows per page
    }

    return ( 
        <div>
            { applications ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Employment Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applications ? (
                                applications
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((application : Application)=>(
                                        <TableRow key={application._id}>
                                            <TableCell>{application.firstName}</TableCell>
                                            <TableCell>{application.lastName}</TableCell>
                                            <TableCell>{application.gender}</TableCell>
                                            <TableCell>{application.employmentStatus}</TableCell>
                                            <TableCell>
                                                <Tooltip title="View">
                                                    <IconButton color="primary" size="large" >
                                                        <VisibilityRounded/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Approve">
                                                    <IconButton style={{color:'green'}} size="large" >
                                                        <CheckCircleOutlineRounded />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Reject">
                                                    <IconButton style={{color:'red'}} size="large">
                                                        <CancelOutlined/>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            ):(
                                <Typography variant="h5">Loading data...</Typography>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination 
                        rowsPerPageOptions={[5,10,20]}
                        component="div"
                        count={applications.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPage}

                    />
                </TableContainer>
            ):(
                <Typography variant="h5">
                    Loadinggg....
                </Typography>
            )} 
        </div>
     );
}
 
export default MemberApplications;