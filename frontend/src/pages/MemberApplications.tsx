import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import { useEffect,useState } from "react";
import axios from "axios";
import useMemberApplicationContext from "../hooks/UseMemberApplicationContext";
import { CancelOutlined, CheckCircleOutlineOutlined, CheckCircleOutlineRounded, VisibilityRounded } from "@mui/icons-material";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
    membershipStatus:string
    
}


const MemberApplications = ():JSX.Element => {

    const {applications, dispatch} = useMemberApplicationContext();

    const [page,setPage] = useState<number>(0); //current page
    const [rowsPerPage,setRowsPerPage] = useState<number>(5); //Rows per page
    const [isRejectDialogOpen,setIsRejectDialogOpen] = useState<boolean>(false);
    const [applicationToReject,setApplicationToReject] = useState<string | null>(null);
    const [isApproveDialogOpen,setIsApproveDialogOpen] = useState<boolean>(false);
    const [applicationToApprove,setApplicationToApprove] = useState<string | null>(null);
    const [isViewDialogOpen,setIsViewDialogOpen] = useState<boolean>(false);
    const [applicationToView,setApplicationToView] = useState<Application | null>(null);

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

    },[applications,dispatch]);


    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, newPage:number) =>{
        setPage(newPage);
    }

    const handleChangeRowsPage = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0); //Reset to the first page when changing rows per page
    }

    // Function to handle opening of the dialog
    const handleOpenRejectDialog = (applicationId : string) =>{
        setApplicationToReject(applicationId);
        setIsRejectDialogOpen(true);
    } 

    // Function to handle closing of the dialog
    const handleCloseRejectDialog = () =>{
        setApplicationToReject(null);
        setIsRejectDialogOpen(false);
    }

    // Function to handle opening of the dialog
    const handleOpenApproveDialog = (applicationId : string) =>{
        setApplicationToApprove(applicationId);
        setIsApproveDialogOpen(true);
    } 

    // Function to handle closing of the dialog
    const handleCloseApproveDialog = () =>{
        setApplicationToApprove(null);
        setIsApproveDialogOpen(false);
    }

    // Function to handle opening of the dialog
    const handleOpenViewDialog = (application : Application) =>{
        setApplicationToView(application);
        setIsViewDialogOpen(true);
    } 

    // Function to handle closing of the dialog
    const handleCloseViewDialog = () =>{
        setApplicationToView(null);
        setIsViewDialogOpen(false);
    }

    // Function to approve member
    const handleApproveMember = async(member : string | null) => {
        if(member !== null){
            try {
                const memberApproval = await axios.get(`http://localhost:4343/api/members/approve/${member}`);
                if(memberApproval.status === 200){
                    handleCloseApproveDialog();
                    toast.success('Member application approved successfully',{
                        position: 'top-right'
                    })
                }
            } catch (error) {
                console.log(error);
                toast.error('Member approval failed',{
                    position: 'top-right'
                })
            }
        }
    }
    // Function to decline membership
    const handleRejectMember = async(member : string | null) =>{
        if(member !== null){
            try {
                const memberRejection = await axios.get(`http://localhost:4343/api/members/decline/${member}`)
                if(memberRejection.status === 200){
                    handleCloseRejectDialog();
                    toast.success('Application declined successfully',{
                        position: 'top-right'
                    })
                }
            } catch (error) {
                console.log(error);
                toast.error('Application failed to be declined',{
                    position: 'top-right'
                })
            }
        }
    }

    return ( 
        <div>
            <Typography variant="h5">Member Applications</Typography>
            { applications ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Employment Status</TableCell>
                                <TableCell>Status</TableCell>
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
                                            <TableCell>{application.membershipStatus}</TableCell>
                                            <TableCell>
                                                <Tooltip title="View">
                                                    <IconButton color="primary" size="large" 
                                                        onClick={()=>{handleOpenViewDialog(application)}}
                                                    >
                                                        <VisibilityRounded/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Approve">
                                                    <IconButton style={{color:'green'}} size="large" 
                                                        onClick={()=>{handleOpenApproveDialog(application._id)}}
                                                    >
                                                        <CheckCircleOutlineRounded />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Reject">
                                                    <IconButton style={{color:'red'}} size="large"
                                                        onClick={()=>{handleOpenRejectDialog(application._id)}}
                                                    >
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
            {/* Reject dialog */}
            <Dialog
                open={isRejectDialogOpen}
                onClose={handleCloseRejectDialog}
                aria-labelledby="reject-dialog-title"
                aria-describedby="reject-dialog-description"
            >
                <DialogTitle id="reject-dialog-title">Confirm Reject</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to reject this application?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseRejectDialog} color="primary" variant="contained">Cancel</Button>
                    <Button variant="contained" color="error" 
                    onClick={()=>{handleRejectMember(applicationToReject)}}
                    startIcon={ <CancelOutlined/> } 
                    >Confirm Reject</Button>
                </DialogActions>
            </Dialog>

            {/* Approve dialog */}
            <Dialog
                open={isApproveDialogOpen}
                onClose={handleCloseApproveDialog}
                aria-labelledby="approve-dialog-title"
                aria-describedby="approve-dialog-description"
            >
                <DialogTitle id="approve-dialog-title">Confirm Approve</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to approve this application?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseApproveDialog} color="primary" variant="contained">Cancel</Button>
                    <Button variant="contained" color="success" 
                    onClick={()=>{handleApproveMember(applicationToApprove)}}
                    startIcon={ <CheckCircleOutlineOutlined/> } 
                    >Confirm Approve</Button>
                </DialogActions>
            </Dialog>
            {/* View details dialog */}
            <Dialog
                open={isViewDialogOpen}
                onClose={handleCloseViewDialog}
                PaperProps={{
                    style:{
                        width: '800px'
                    }
                }}
                aria-labelledby="view-dialog-title"
                aria-describedby="view-dialog-description"
                >
                <DialogTitle id="view-dialog-title">View Application Details</DialogTitle>
                <DialogContent>
                    {applicationToView && (
                    <>
                        <Typography variant="body1">
                        <strong>First Name:</strong> {applicationToView.firstName}
                        </Typography>
                        <Typography variant="body1">
                        <strong>Last Name:</strong> {applicationToView.lastName}
                        </Typography>
                        <Typography variant="body1">
                        <strong>Gender:</strong> {applicationToView.gender}
                        </Typography>
                        <Typography variant="body1">
                        <strong>Date of birth:</strong> {applicationToView.dateOfBirth ? new Date(applicationToView.dateOfBirth).toLocaleDateString() : ''}
                        </Typography>
                        <Typography variant="body1">
                        <strong>Residential Address:</strong> {applicationToView.residentialAddress}
                        </Typography>
                        <Typography variant="body1">
                        <strong>Email:</strong> {applicationToView.email}
                        </Typography>
                        <Typography variant="body1">
                        <strong>Phone Number:</strong> {applicationToView.phoneNumber}
                        </Typography>
                        <Typography variant="body1">
                        <strong>Employment Status:</strong> {applicationToView.employmentStatus}
                        </Typography>
                        <Typography variant="body1">
                        <strong>Current Occupation:</strong> {applicationToView.currentOccupation ? applicationToView.currentOccupation : 'None'}
                        </Typography>
                        <Typography variant="body1">
                        <strong>Employer Name:</strong> {applicationToView.employerName ? applicationToView.employerName : 'None'}
                        </Typography>
                        <Typography variant="body1">
                        <strong>Employer Email:</strong> {applicationToView.employerEmail ? applicationToView.employerEmail : 'None'}
                        </Typography>
                        <Typography variant="body1">
                        <strong>Employer Phone number :</strong> {applicationToView.employerPhoneNumber ? applicationToView.employerPhoneNumber : 'None'}
                        </Typography>
                        <Typography variant="body1">
                        <strong>Next of Kin:</strong> {applicationToView.nextOfKin}
                        </Typography>
                        <Typography variant="body1">
                        <strong>Next of Kin email:</strong> {applicationToView.nextOfKinEmail}
                        </Typography>
                        <Typography variant="body1">
                        <strong>Next of Kin Phone number:</strong> {applicationToView.nextOfKinPhoneNumber}
                        </Typography>
                        
                    </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseViewDialog} color="primary" variant="contained">
                    Close
                    </Button>
                </DialogActions>
                </Dialog>

        </div>
     );
}
 
export default MemberApplications;