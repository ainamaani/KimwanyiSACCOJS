import { Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Define a styled TextField component
const StyledTextField = styled(TextField)({
  marginTop: 20,
  marginBottom: 20,
  display: 'block',
});

// Define a styled RadioGroup component
const StyledRadioGroup = styled(RadioGroup)({
  marginTop: 20,
  marginBottom: 20,
  
});

const StyledPageContent = styled('div')({
    padding: '30px'
})

const MemberRegistration = () => {
    // define default date for the date of birth
    const defaultDate = new Date('1990-01-01').toISOString().substr(0, 10);
    // states definition
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [gender,setGender] = useState('');
    const [dateOfBirth,setDateOfBirth] = useState(defaultDate);
    const [residentialAddress,setResidentialAddress] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [employmentStatus,setEmploymentStatus] = useState('');
    const [currentOccupation,setCurrentOccupation] = useState(null);
    const [employerName,setEmployerName] = useState(null);
    const [employerEmail,setEmployerEmail] = useState(null);
    const [employerPhoneNumber,setEmployerPhoneNumber] = useState(null);
    const [nextOfKin,setNextOfKin] = useState('');
    const [nextOfKinEmail,setNextOfKinEmail] = useState('');
    const [nextOfKinPhoneNumber,setNextOfKinPhoneNumber] = useState('');

    // function to handle member application
    const handleMemberApplication = async(e) =>{
        e.preventDefault();
        
        const memberApplicationData ={firstName,lastName,email,dateOfBirth,residentialAddress,gender,phoneNumber,
            employmentStatus,employerName,employerEmail,employerPhoneNumber,nextOfKin,
            nextOfKinEmail,nextOfKinPhoneNumber,currentOccupation}
        try {
            // hitting the backend to send the data
            const memberApplication = await axios.post('http://localhost:4343/api/members/apply',
            JSON.stringify(memberApplicationData),
            {
                headers:{
                    'Content-Type':'application/json'
                }
            });
            console.log(memberApplication.status);
            // checking if the request is a success
            if(memberApplication.status === 200){
                setFirstName('');
                setLastName('');
                setGender('');
                setDateOfBirth('');
                setResidentialAddress('');
                setEmail('');
                setPhoneNumber('');
                setEmploymentStatus('');
                setCurrentOccupation(null);
                setEmployerName(null);
                setEmployerEmail(null);
                setEmployerPhoneNumber(null);
                setNextOfKin('');
                setNextOfKinEmail('');
                setNextOfKinPhoneNumber('');
                // show success notification
                toast.success('Your application for SACCO Membership is successful',{
                    position: 'top-right'
                })
            }
        
        } catch (error) {
            console.log(error);
            // show fail message
            toast.error('Your application for SACCO Membership has failed',{
                position: 'top-right'
            })
        }
        

    }
    // Define the "Current Occupation" field to avoid duplication
    const currentOccupationField = (
        <StyledTextField
            label="Current occupation"
            variant="outlined"
            fullWidth
            required
            value={currentOccupation}
            onChange={(e) => { setCurrentOccupation(e.target.value) }}
        />
    );

    return (
        <StyledPageContent>
            <Typography variant="h3">Kimwanyi SACCO Member Registration Form</Typography>
            <form noValidate autoComplete="off" onSubmit={handleMemberApplication}>
                {/* SECTION 1 */}
                <Typography variant="h4">Personal Data</Typography>
                <StyledTextField
                label="First name"
                variant="outlined"
                fullWidth required
                value={firstName}
                onChange={(e)=> {setFirstName(e.target.value)}}
                />
                <StyledTextField
                label="Last name"
                variant="outlined"
                fullWidth required
                value={lastName}
                onChange={(e)=> {setLastName(e.target.value)}}
                />
                <StyledRadioGroup value={gender} onChange={(e)=> {setGender(e.target.value)}}>
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </StyledRadioGroup>
                <StyledTextField
                label="Date of birth"
                variant="outlined"
                fullWidth required
                value={dateOfBirth}
                onChange={(e)=> {setDateOfBirth(e.target.value)}}
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <StyledTextField 
                label="Residential Address" 
                variant="outlined" 
                fullWidth required 
                value={residentialAddress}
                onChange={(e)=> {setResidentialAddress(e.target.value)}}
                />
                <StyledTextField 
                label="Email" 
                variant="outlined" 
                fullWidth required 
                value={email}
                onChange={(e)=> {setEmail(e.target.value)}}
                />
                <StyledTextField
                label="Phone number"
                variant="outlined"
                fullWidth required
                value={phoneNumber}
                onChange={(e)=> {setPhoneNumber(e.target.value)}}
                />
                {/* SECTION 2 */}
                <Typography variant="h4">Employment details</Typography>
                <StyledRadioGroup value={employmentStatus} onChange={(e)=>{setEmploymentStatus(e.target.value)}}>
                    <FormControlLabel
                        value="Employed"
                        control={<Radio />}
                        label="Employed"
                    />
                    <FormControlLabel
                        value="Self Employed"
                        control={<Radio />}
                        label="Self Employed"
                    />
                    <FormControlLabel
                        value="Unemployed"
                        control={<Radio />}
                        label="Unemployed"
                    />
                </StyledRadioGroup>
                {/* Rendering certain fields depending on the employment status */}
                { employmentStatus === 'Self Employed' && currentOccupationField }
                { employmentStatus === 'Employed'  && (
                    <>  
                        {currentOccupationField}
                        <StyledTextField
                        label="Employer name"
                        variant="outlined"
                        fullWidth
                        value={employerName}
                        onChange={(e)=> {setEmployerName(e.target.value)}}
                        
                        />
                        <StyledTextField
                        label="Employer email"
                        variant="outlined"
                        fullWidth
                        value={employerEmail}
                        onChange={(e)=> {setEmployerEmail(e.target.value)}}
                        
                        />
                        <StyledTextField
                        label="Employer Phone number"
                        variant="outlined"
                        fullWidth
                        value={employerPhoneNumber}
                        onChange={(e)=> {setEmployerPhoneNumber(e.target.value)}}
                        
                        />
                    </>
                
                )}
                
                {/* SECTION 3 */}
                <Typography variant="h4">Next of kin details</Typography>
                <StyledTextField
                label="Next of Kin"
                variant="outlined"
                fullWidth required
                value={nextOfKin}
                onChange={(e)=> {setNextOfKin(e.target.value)}}
                />
                <StyledTextField
                label="Next of Kin Email"
                variant="outlined"
                fullWidth required
                value={nextOfKinEmail}
                onChange={(e)=> {setNextOfKinEmail(e.target.value)}}
                />
                <StyledTextField
                label="Next of Kin Phone number"
                variant="outlined"
                fullWidth required
                value={nextOfKinPhoneNumber}
                onChange={(e)=> {setNextOfKinPhoneNumber(e.target.value)}}
                />
                <Button variant="contained" type="submit"
                >Apply</Button>
            </form>
        </StyledPageContent>
    );
};

export default MemberRegistration;
