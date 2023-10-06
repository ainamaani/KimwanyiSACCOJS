import { Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React,{useEffect,useState} from 'react';


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
    const [currentOccupation,setCurrentOccupation] = useState('');
    const [employerName,setEmployerName] = useState('');
    const [employerEmail,setEmployerEmail] = useState('');
    const [employerPhoneNumber,setEmployerPhoneNumber] = useState('');
    const [nextOfKin,setNextOfKin] = useState('');
    const [nextOfKinEmail,setNextOfKinEmail] = useState('');
    const [nextOfKinPhoneNumber,setNextOfKinPhoneNumber] = useState('');

    // function to handle member application
    const handleMemberApplication = (e) =>{
        e.preventDefault();
        console.log("form submitted");
        console.log(
            firstName,lastName,email,dateOfBirth,residentialAddress,gender,phoneNumber,
            employmentStatus,employerName,employerEmail,employerPhoneNumber,nextOfKin,
            nextOfKinEmail,nextOfKinPhoneNumber
        )
    }
    
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
                <StyledTextField
                label="Current occupation"
                variant="outlined"
                fullWidth required
                value={currentOccupation}
                onChange={(e)=> {setCurrentOccupation(e.target.value)}}
                />
                <StyledTextField
                label="Employer name"
                variant="outlined"
                fullWidth required
                value={employerName}
                onChange={(e)=> {setEmployerName(e.target.value)}}
                />
                <StyledTextField
                label="Employer email"
                variant="outlined"
                fullWidth required
                value={employerEmail}
                onChange={(e)=> {setEmployerEmail(e.target.value)}}
                />
                <StyledTextField
                label="Employer Phone number"
                variant="outlined"
                fullWidth required
                value={employerPhoneNumber}
                onChange={(e)=> {setEmployerPhoneNumber(e.target.value)}}
                />
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
