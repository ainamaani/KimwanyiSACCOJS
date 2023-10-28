import { Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Typography, TablePagination, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from "@mui/material";
import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import { DeleteOutlineOutlined,VisibilityRounded } from "@mui/icons-material";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
    const [isDeleteDialogOpen,setIsDeleteDialogOpen] = useState<boolean>(false);
    const [memberToDelete,setMemberToDelete] = useState<string | null>(null);
    const [isViewDialogOpen,setIsViewDialogOpen] = useState<boolean>(false);
    const [memberToView,setMemberToView] = useState<Member | null>(null);

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

     // Function to handle opening of the dialog
     const handleOpenDeleteDialog = (memberId : string) =>{
        setMemberToDelete(memberId);
        setIsDeleteDialogOpen(true);
    } 

    // Function to handle closing of the dialog
    const handleCloseDeleteDialog = () =>{
        setMemberToDelete(null);
        setIsDeleteDialogOpen(false);
    }

    // Function to handle opening of the dialog
    const handleOpenViewDialog = (member : Member) =>{
        setMemberToView(member);
        setIsViewDialogOpen(true);
    } 

    // Function to handle closing of the dialog
    const handleCloseViewDialog = () =>{
        setMemberToView(null);
        setIsViewDialogOpen(false);
    }

    // Function to delete member
    const handleDeleteMember = async(member : string | null) =>{
        if(member !== null){
            // try deleting the member
            try {
                const deletedMember = await axios.delete(`http://localhost:4343/api/members/delete/${member}`);
                if(deletedMember.status === 200){
                    handleCloseDeleteDialog();
                    toast.success('Member deleted successfully',{
                        position:'top-right'
                    })
                }
            } catch (error) {
                toast.error('Member deletion failed',{
                    position:'top-right'
                })
                console.log(error);
            }
        }
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
                                <TableCell>Actions</TableCell>
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
                                    <TableCell>
                                        <Tooltip title="View member">
                                            <IconButton color="primary" size="large"
                                                onClick={()=>{handleOpenViewDialog(member)}}
                                                >
                                                <VisibilityRounded/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" size="large"
                                                onClick={()=>{handleOpenDeleteDialog(member._id)}}
                                                >
                                                <DeleteOutlineOutlined/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
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
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <CircularProgress />
                </div>
            )}

            {/* Delete member dialog */}
            <Dialog
                open={isDeleteDialogOpen}
                onClose={handleCloseDeleteDialog}
            >
                <DialogTitle>Delete member</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Are you sure you want to delete the member?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="contained"
                    onClick={handleCloseDeleteDialog}
                    >Close</Button>
                    <Button color="error" variant="contained"
                    onClick={()=>{handleDeleteMember(memberToDelete)}}
                    >Delete</Button>
                </DialogActions>
            </Dialog>

            {/* View member dialog */}
            <Dialog
                open={isViewDialogOpen}
                onClose={handleCloseViewDialog}
                PaperProps={{
                    style:{
                        width: '800px'
                    }
                }}
            >
                <DialogTitle>SACCO member details</DialogTitle>
                <DialogContent>
                    { memberToView && (
                        <>
                           <Typography variant="body1">
                            <strong>First Name:</strong> {memberToView.firstName}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Last Name:</strong> {memberToView.lastName}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Gender:</strong> {memberToView.gender}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Date of birth:</strong> {memberToView.dateOfBirth ? new Date(memberToView.dateOfBirth).toLocaleDateString() : ''}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Residential Address:</strong> {memberToView.residentialAddress}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Email:</strong> {memberToView.email}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Phone Number:</strong> {memberToView.phoneNumber}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Employment Status:</strong> {memberToView.employmentStatus}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Current Occupation:</strong> {memberToView.currentOccupation ? memberToView.currentOccupation : 'None'}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Employer Name:</strong> {memberToView.employerName ? memberToView.employerName : 'None'}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Employer Email:</strong> {memberToView.employerEmail ? memberToView.employerEmail : 'None'}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Employer Phone number :</strong> {memberToView.employerPhoneNumber ? memberToView.employerPhoneNumber : 'None'}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Next of Kin:</strong> {memberToView.nextOfKin}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Next of Kin email:</strong> {memberToView.nextOfKinEmail}
                            </Typography>
                            <Typography variant="body1">
                            <strong>Next of Kin Phone number:</strong> {memberToView.nextOfKinPhoneNumber}
                            </Typography> 
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="contained">View Account</Button>
                    <Button onClick={handleCloseViewDialog} color="primary" variant="contained"
                    >Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
 
export default Members;