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

const StyledButton = styled(Button)({
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
})

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
    const [errors,setErrors] = useState({});

    // logging the errors when the object changes and outside the function to allow time for setting the errors
    useEffect(()=>{
        console.log(errors);
    },[errors])

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
            // reset the error object
            setErrors({});
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
            if (error.response && error.response.data && error.response.data.errors) {
                // If there are validation errors, set them in the state
                setErrors(error.response.data.errors);
              }
            
            // show fail message
            toast.error('Your application for SACCO Membership has failed',{
                position: 'top-right'
            })
        }
        

    }
    // Define the "Current Occupation" field to avoid duplication
    const currentOccupationField = (
        <>
            <StyledTextField
            label="Current occupation"
            variant="outlined"
            fullWidth
            error={errors.currentOccupation}
            required={employmentStatus === "Employed" || employmentStatus === "Self Employed"}
            value={currentOccupation}
            onChange={(e) => { setCurrentOccupation(e.target.value) }}
            />
            { errors.currentOccupation && (
                <span style={{color:'red'}}>{errors.currentOccupation}</span>
            )}
        </>
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
                error={errors.firstName}
                />
                {/* Display errors for the first name field */}
                { errors.firstName && (
                    <span style={{color:'red'}}>{errors.firstName}</span>
                )}
                <StyledTextField
                label="Last name"
                variant="outlined"
                fullWidth required
                value={lastName}
                onChange={(e)=> {setLastName(e.target.value)}}
                error={errors.lastName}
                />
                {/* Display errors for the last name field */}
                { errors.lastName && (
                    <span style={{color:'red'}}>{errors.lastName}</span>
                )}
                <StyledRadioGroup value={gender} onChange={(e)=> {setGender(e.target.value)}} >
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </StyledRadioGroup>
                {/* Display errors for the gender field */}
                { errors.gender && (
                    <span style={{color:'red'}}>{errors.gender}</span>
                )}
                <StyledTextField
                label="Date of birth"
                variant="outlined"
                fullWidth required
                value={dateOfBirth}
                onChange={(e)=> {setDateOfBirth(e.target.value)}}
                error={errors.dateOfBirth}
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
                />
                {/* Display errors for the date of birth field */}
                { errors.dateOfBirth && (
                    <span style={{color:'red'}}>{errors.dateOfBirth}</span>
                )}
                <StyledTextField 
                label="Residential Address" 
                variant="outlined" 
                fullWidth required 
                value={residentialAddress}
                onChange={(e)=> {setResidentialAddress(e.target.value)}}
                error={errors.residentialAddress}
                />
                {/* Display errors for the residential address field */}
                { errors.residentialAddress && (
                    <span style={{color:'red'}}>{errors.residentialAddress}</span>
                )}
                <StyledTextField 
                label="Email" 
                variant="outlined" 
                fullWidth required 
                value={email}
                onChange={(e)=> {setEmail(e.target.value)}}
                error={errors.email}
                />
                {/* Display errors for the email field */}
                { errors.email && (
                    <span style={{color:'red'}}>{errors.email}</span>
                )}
                <StyledTextField
                label="Phone number"
                variant="outlined"
                fullWidth required
                value={phoneNumber}
                onChange={(e)=> {setPhoneNumber(e.target.value)}}
                error={errors.phoneNumber}
                />
                {/* Display errors for the phone number field */}
                { errors.phoneNumber && (
                    <span style={{color:'red'}}>{errors.phoneNumber}</span>
                )}
                {/* SECTION 2 */}
                <Typography variant="h4">Employment details</Typography>
                <StyledRadioGroup value={employmentStatus} onChange={(e)=>{setEmploymentStatus(e.target.value)}} error={errors.firstName}>
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
                {/* Display errors for the employment status field */}
                { errors.employmentStatus && (
                    <span style={{color:'red'}}>{errors.employmentStatus}</span>
                )}
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
                        error={errors.employerName}
                        onChange={(e)=> {setEmployerName(e.target.value)}}
                        required={employmentStatus === "Employed"}
                        />
                        { errors.employerName && (
                            <span style={{color:'red'}}>{errors.employerName}</span>
                        )}
                        <StyledTextField
                        label="Employer email"
                        variant="outlined"
                        fullWidth
                        value={employerEmail}
                        error={errors.employerEmail}
                        onChange={(e)=> {setEmployerEmail(e.target.value)}}
                        required={employmentStatus === "Employed"}
                        />
                        { errors.employerEmail && (
                             <span style={{color:'red'}}>{errors.employerEmail}</span>
                        )}
                        <StyledTextField
                        label="Employer Phone number"
                        variant="outlined"
                        fullWidth
                        value={employerPhoneNumber}
                        error={errors.employerPhoneNumber}
                        onChange={(e)=> {setEmployerPhoneNumber(e.target.value)}}
                        required={employmentStatus === "Employed"}
                        />
                        { errors.employerPhoneNumber && (
                             <span style={{color:'red'}}>{errors.employerPhoneNumber}</span>
                        )}
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
                error={errors.nextOfKin}
                />
                {/* Display errors for the next of kin field */}
                { errors.nextOfKin && (
                    <span style={{color:'red'}}>{errors.nextOfKin}</span>
                )}
                <StyledTextField
                label="Next of Kin Email"
                variant="outlined"
                fullWidth required
                value={nextOfKinEmail}
                onChange={(e)=> {setNextOfKinEmail(e.target.value)}}
                error={errors.nextOfKinEmail}
                />
                {/* Display errors for the next of kin email field */}
                { errors.nextOfKinEmail && (
                    <span style={{color:'red'}}>{errors.nextOfKinEmail}</span>
                )}
                <StyledTextField
                label="Next of Kin Phone number"
                variant="outlined"
                fullWidth required
                value={nextOfKinPhoneNumber}
                onChange={(e)=> {setNextOfKinPhoneNumber(e.target.value)}}
                error={errors.nextOfKinPhoneNumber}
                />
                {/* Display errors for the next of kin phone number field */}
                { errors.nextOfKinPhoneNumber && (
                    <span style={{color:'red'}}>{errors.nextOfKinPhoneNumber}</span>
                )}
                <StyledButton variant="contained" type="submit"
                >Apply</StyledButton>
            </form>
        </StyledPageContent>
    );
};

export default MemberRegistration;
