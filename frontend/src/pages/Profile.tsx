import { Button, Typography, TextField } from "@mui/material";
import React,{useState,useEffect} from 'react';
import useAuthContext from "../hooks/UseAuthContext";
import axios from 'axios';
import { styled } from "@mui/styles";

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

    // fetch data for the currently logged in user
    useEffect(()=>{
        const fetchLoggedInUserData = async() =>{
            try {
                const response = await axios.get<LoggedInUser | LoggedInUser[]>(`http://localhost:4343/api/members/member/${member.email}`);
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
        fetchLoggedInUserData();
    },[]);

    // function for changing password
    const handleChangePassword = async() => {

    }
    
    return ( 
        <div>
            <Typography variant="h4">Your Member details</Typography>
            {loggedInMemberData  ? (
                <div>
                    <Typography variant="body1">First Name: {loggedInMemberData.firstName}</Typography>
                    <Typography variant="body1">Last Name: {loggedInMemberData.lastName}</Typography>
                    <Typography variant="body1">Gender: {loggedInMemberData.gender}</Typography>
                    <Typography variant="body1">Residential Address: {loggedInMemberData.residentialAddress}</Typography>
                    <Typography variant="body1">Email: {loggedInMemberData.email}</Typography>
                    <Typography variant="body1">Phone number: {loggedInMemberData.phoneNumber}</Typography>
                    <Typography variant="body1">Employment Status: {loggedInMemberData.employmentStatus}</Typography>
                    <Typography variant="body1">Current Occupation: {loggedInMemberData.currentOccupation ? loggedInMemberData.currentOccupation : "None"}</Typography>
                    <Typography variant="body1">Employer Name: {loggedInMemberData.employerName ? loggedInMemberData.employerName : "None"}</Typography>
                    <Typography variant="body1">Employer Email: {loggedInMemberData.employerEmail ? loggedInMemberData.employerEmail : "None"}</Typography>
                    <Typography variant="body1">Employer Phone number: {loggedInMemberData.employerPhoneNumber ? loggedInMemberData.employerPhoneNumber : "None"}</Typography>
                    <Typography variant="body1">Next of kin: {loggedInMemberData.nextOfKin}</Typography>
                    <Typography variant="body1">Next of kin Email: {loggedInMemberData.nextOfKinEmail}</Typography>
                    <Typography variant="body1">Next of kin Phone Number: {loggedInMemberData.nextOfKinPhoneNumber}</Typography>
                    
                </div>
            ):(
                <Typography>Loading...</Typography>
            )}

            <StyledButtonButton variant="contained">Edit details</StyledButtonButton>

            <Typography>Change password</Typography>
            <form noValidate autoComplete="off" onSubmit={handleChangePassword}>
                <StyledTextField 
                label="Cuurent password"
                fullWidth required
                variant="outlined"
                />
                <StyledTextField 
                label="New password"
                fullWidth required
                variant="outlined"
                />
                <StyledButton variant="contained" type="submit">Change password</StyledButton>
            </form>
        </div>
     );
}
 
export default Profile;