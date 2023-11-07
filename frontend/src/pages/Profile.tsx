import { Button, Typography, TextField, CircularProgress} from "@mui/material";
import React,{useState,useEffect} from 'react';
import useAuthContext from "../hooks/UseAuthContext";
import axios from 'axios';
import { styled } from "@mui/styles";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

interface LoggedInUser{
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

const StyledTextField = styled(TextField)({
    marginTop: '20px',
    marginBottom: '20px',
    display: 'block'
})

const StyledButton = styled(Button)({
    marginTop: '20px',
    marginBottom: '20px',
    display: 'block'
})

const Profile = ():JSX.Element => {
    const {member} = useAuthContext();

    const [loggedInMemberData, setLoggedInMemberData] = useState<LoggedInUser | null>(null);
    // change password states
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    // error states
    const [error, setError] = useState<string>('');

    // fetch data for the currently logged in user
    useEffect(()=>{
        const fetchLoggedInUserData = async() =>{
            try {
                const response = await axios.get<LoggedInUser | LoggedInUser[]>(`http://localhost:4343/api/members/member/${member.email}`,{
                    headers:{
                        'Authorization': `Bearer ${member.token}`
                    }
                });
                console.log("API Response:", response);

                if (Array.isArray(response.data)) {
                    // If the response is an array, set the first item in the array as the user data
                    if (response.data.length > 0) {
                        setLoggedInMemberData(response.data[0]);
                    } else {
                        console.log("No data found in the response");
                    }
                } else if (response.data && response.status === 200) {
                    // If the response is a single object, set it directly
                    setLoggedInMemberData(response.data);
                }
            } catch (error) {
                console.log("Error while fetching user data:", error);
            }
        }
        if(member){
            fetchLoggedInUserData();
        }
    },[member]);

    // function for changing password
    const handleChangePassword = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!member){
            return;
        }
        setError('');
        try {
            const response = await axios.post(`http://localhost:4343/api/members/changepassword/${loggedInMemberData?._id}`,
                                    JSON.stringify({ currentPassword,newPassword }),{
                                        headers:{
                                            'Content-Type':'application/json',
                                            'Authorization': `Bearer ${member.token}`
                                        }
                                    }
            );
            if(response.status === 200){
                console.log(response);
                setCurrentPassword('');
                setNewPassword('');
                toast.success('Password changed sucessfully',{
                    position: "top-right"
                });
            }
        } catch (error : any) {
            if(error.response && error.response.data && error.response.data.error ){
                // set error
                setError(error.response.data.error);
                // send feedback
                toast.error("Password change failed",{
                    position:"top-right"
                })
            }
        } 
    }
    
    return ( 
        <div >
            <div className="content">
            <Typography variant="h4">Your Member details</Typography>
            {loggedInMemberData  ? (
                <div>
                    <Typography variant="body1"><strong>First Name:</strong> {loggedInMemberData.firstName}</Typography>
                    <Typography variant="body1"><strong>Last Name:</strong> {loggedInMemberData.lastName}</Typography>
                    <Typography variant="body1"><strong>Gender: </strong>{loggedInMemberData.gender}</Typography>
                    <Typography variant="body1"><strong>Residential Address:</strong> {loggedInMemberData.residentialAddress}</Typography>
                    <Typography variant="body1"><strong>Email:</strong> {loggedInMemberData.email}</Typography>
                    <Typography variant="body1"><strong>Phone number:</strong> {loggedInMemberData.phoneNumber}</Typography>
                    <Typography variant="body1"><strong>Employment Status:</strong> {loggedInMemberData.employmentStatus}</Typography>
                    <Typography variant="body1"><strong>Current Occupation:</strong> {loggedInMemberData.currentOccupation ? loggedInMemberData.currentOccupation : "None"}</Typography>
                    <Typography variant="body1"><strong>Employer Name:</strong> {loggedInMemberData.employerName ? loggedInMemberData.employerName : "None"}</Typography>
                    <Typography variant="body1"><strong>Employer Email:</strong> {loggedInMemberData.employerEmail ? loggedInMemberData.employerEmail : "None"}</Typography>
                    <Typography variant="body1"><strong>Employer Phone number:</strong> {loggedInMemberData.employerPhoneNumber ? loggedInMemberData.employerPhoneNumber : "None"}</Typography>
                    <Typography variant="body1"><strong>Next of kin:</strong> {loggedInMemberData.nextOfKin}</Typography>
                    <Typography variant="body1"><strong>Next of kin Email:</strong> {loggedInMemberData.nextOfKinEmail}</Typography>
                    <Typography variant="body1"><strong>Next of kin Phone Number:</strong> {loggedInMemberData.nextOfKinPhoneNumber}</Typography>
                    
                </div>
            ):(
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <CircularProgress />
                </div>
            )}
            <Link to={'/update'} 
                style={{
                    textDecoration:"none",
                    backgroundColor:"blue",
                    padding: "5px",
                    color: "white",
                    borderRadius: "4px",
                    marginTop: "10px"
                }}
            >Update details</Link>
            
            </div>

            
            <form noValidate autoComplete="off" onSubmit={handleChangePassword}>
            <Typography variant="body1">Change password</Typography>
                <StyledTextField 
                    label="Current password"
                    fullWidth required
                    variant="outlined"
                    sx={{marginTop: 2, 
                        marginBottom: 2, 
                        width: 600,
                        display: 'block'
                     }}
                    value={currentPassword}
                    type="password"
                    onChange={(e)=>{setCurrentPassword(e.target.value)}}
                />
                <StyledTextField 
                    label="New password"
                    fullWidth required
                    variant="outlined"
                    value={newPassword}
                    sx={{marginTop: 2, 
                        marginBottom: 2, 
                        width: 600,
                        display: 'block'
                     }}
                    type="password"
                    onChange={(e)=>{setNewPassword(e.target.value)}}
                />
                <StyledButton variant="contained" 
                sx={{marginTop: 2, 
                    marginBottom: 2, 
                    display: 'block'  
                 }}
                type="submit">Change password</StyledButton>
                { error && <span style={{color:"red"}}>{error}</span> }
            </form>
        </div>
     );
}
 
export default Profile;