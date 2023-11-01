import { Typography,TextField,Button,Radio, RadioGroup,FormControlLabel } from "@mui/material";
import React,{useEffect,useState} from 'react';
import { styled } from "@mui/system";
import axios from 'axios';
import useAuthContext from "../hooks/UseAuthContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface InitialMemberDetails{
    _id:string,
    firstName:string,
    lastName:string,
    gender:string,
    dateOfBirth:Date | null,
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

interface ChangedFields{
    _id ?: string,
    firstName ?: string,
    lastName ?: string,
    gender ?: string,
    dateOfBirth ?: Date | null,
    residentialAddress ?: string,
    email ?: string,
    phoneNumber ?: string,
    employmentStatus  ?: string,
    currentOccupation ?: string,
    employerName ?: string,
    employerEmail ?: string,
    employerPhoneNumber ?: string,
    nextOfKin ?: string,
    nextOfKinEmail ?: string,
    nextOfKinPhoneNumber ?: string,
    membershipStatus ?: string
}

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


const UpdateMemberData = ():JSX.Element => {

    const {member} = useAuthContext();

    const [firstName,setFirstName] = useState<string>('');
    const [lastName,setLastName] = useState<string>('');
    const [gender,setGender] = useState<string>('');
    const [dateOfBirth,setDateOfBirth] = useState<Date | null>(null);
    const [residentialAddress,setResidentialAddress] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [phoneNumber,setPhoneNumber] = useState<string>('');
    const [employmentStatus,setEmploymentStatus] = useState<string>('');
    const [currentOccupation,setCurrentOccupation] = useState<string | null>(null);
    const [employerName,setEmployerName] = useState<string | null>(null);
    const [employerEmail,setEmployerEmail] = useState<string | null>(null);
    const [employerPhoneNumber,setEmployerPhoneNumber] = useState<string | null>(null);
    const [nextOfKin,setNextOfKin] = useState<string>('');
    const [nextOfKinEmail,setNextOfKinEmail] = useState<string>('');
    const [nextOfKinPhoneNumber,setNextOfKinPhoneNumber] = useState<string>('');
    const [errors,setErrors] = useState<Record<string, string>>({});
    const [initialMemberDetails,setInitialMemberDetails] = useState<InitialMemberDetails>({
        _id: '',firstName:'',lastName:'',gender:'',dateOfBirth:null,residentialAddress:'',
        email:'',phoneNumber:'',employmentStatus:'',currentOccupation:'', employerName:'',
        employerEmail:'',employerPhoneNumber:'',nextOfKin:'',nextOfKinEmail:'',nextOfKinPhoneNumber:'',membershipStatus:''
    });

    // fetch current data
    useEffect(()=>{
        const fetchInitialDetails = async() =>{
            try {
               const initialMemberData =  await axios.get<InitialMemberDetails>(`http://localhost:4343/api/members/${member.id}`);
               if(initialMemberData.status === 200){
                    const data : InitialMemberDetails = initialMemberData.data;
                    console.log(data);
                    setInitialMemberDetails(data);
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setEmail(data.email);
                    setGender(data.gender);
                    setPhoneNumber(data.phoneNumber);
                    setResidentialAddress(data.residentialAddress);
                    setEmploymentStatus(data.employmentStatus);
                    setDateOfBirth(data.dateOfBirth);
                    setCurrentOccupation(data.currentOccupation);
                    setEmployerEmail(data.employerEmail);
                    setEmployerName(data.employerName);
                    setEmployerPhoneNumber(data.employerPhoneNumber);
                    setNextOfKin(data.nextOfKin);
                    setNextOfKinEmail(data.nextOfKinEmail);
                    setNextOfKinPhoneNumber(data.nextOfKinPhoneNumber);
               }
            } catch (error) {
                console.log(error);
            }
        }
        fetchInitialDetails();
    },[member]);

    const handleUpdateMemberDate = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const changedFields : ChangedFields = {};
        if(firstName !== initialMemberDetails.firstName){
            changedFields.firstName = firstName;
        }
        if(lastName !== initialMemberDetails.lastName){
            changedFields.lastName = lastName;
        }
        if(gender !== initialMemberDetails.gender){
            changedFields.gender = gender;
        }
        if(email !== initialMemberDetails.email){
            changedFields.email = email;
        }
        if(phoneNumber !== initialMemberDetails.phoneNumber){
            changedFields.phoneNumber = phoneNumber;
        }
        if(residentialAddress !== initialMemberDetails.residentialAddress){
            changedFields.residentialAddress = residentialAddress;
        }
        if(dateOfBirth !== initialMemberDetails.dateOfBirth){
            changedFields.dateOfBirth = dateOfBirth;
        }
        if(currentOccupation && currentOccupation !== initialMemberDetails.currentOccupation){
            changedFields.currentOccupation = currentOccupation;
        }
        if(employmentStatus !== initialMemberDetails.employmentStatus){
            changedFields.employmentStatus = employmentStatus;
        }
        if(employerName && employerName !== initialMemberDetails.employerName){
            changedFields.employerName = employerName;
        }
        if(employerEmail && employerEmail !== initialMemberDetails.employerEmail){
            changedFields.employerEmail = employerEmail;
        }
        if(employerPhoneNumber && employerPhoneNumber !== initialMemberDetails.employerPhoneNumber){
            changedFields.employerPhoneNumber = employerPhoneNumber;
        }
        if(nextOfKin !== initialMemberDetails.nextOfKin){
            changedFields.nextOfKin = nextOfKin;
        }
        if(nextOfKinEmail !== initialMemberDetails.nextOfKinEmail){
            changedFields.nextOfKinEmail = nextOfKinEmail;
        }
        if(nextOfKinPhoneNumber !== initialMemberDetails.nextOfKinPhoneNumber){
            changedFields.nextOfKinPhoneNumber = nextOfKinPhoneNumber;
        }

        try {
            const updatedMemberData = await axios.patch(`http://localhost:4343/api/members/update/${member.id}`,
                                        JSON.stringify(changedFields),{
                                            headers:{
                                               'Content-Type':'application/json' 
                                            }
                                        }
            );
            if(updatedMemberData.status === 200){
                console.log(updatedMemberData);
                setInitialMemberDetails({
                    _id: '',firstName:'',lastName:'',gender:'',dateOfBirth:null,residentialAddress:'',
                    email:'',phoneNumber:'',employmentStatus:'',currentOccupation:'', employerName:'',
                    employerEmail:'',employerPhoneNumber:'',nextOfKin:'',nextOfKinEmail:'',nextOfKinPhoneNumber:'',membershipStatus:'' 
                });
                setFirstName('');
                setLastName('');
                setEmail('');
                setGender('');
                setPhoneNumber('');
                setResidentialAddress('');
                setEmploymentStatus('');
                setDateOfBirth(null);
                setCurrentOccupation('');
                setEmployerEmail('');
                setEmployerName('');
                setEmployerPhoneNumber('');
                setNextOfKin('');
                setNextOfKinEmail('');
                setNextOfKinPhoneNumber('');
                toast.success("Details updated successfully",{
                    position: "top-right"
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Define the "Current Occupation" field to avoid duplication
    const currentOccupationField = (
        <>
            <StyledTextField
            label="Current occupation"
            variant="outlined"
            fullWidth
            sx={{marginTop: 2, 
                marginBottom: 2, 
                width: 800,

             }}
            error={!!errors.currentOccupation}  // two exlamations marks to convert the string to boolean
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
        <div>
            <Typography variant="h5">Update details</Typography>
            <form autoComplete="off" noValidate onSubmit={handleUpdateMemberDate} >
            {/* SECTION 1 */}
            <Typography variant="h5">Personal Data</Typography>
                <StyledTextField
                label="First name"
                variant="outlined"
                fullWidth required
                sx={{marginTop: 2, 
                    marginBottom: 2, 
                    width: 800,

                 }}
                value={firstName}
                onChange={(e)=> {setFirstName(e.target.value)}}
                error={!!errors.firstName} // two exlamations marks to convert the string to boolean
                />
                {/* Display errors for the first name field */}
                { errors.firstName && (
                    <span style={{color:'red'}}>{errors.firstName}</span>
                )}
                <StyledTextField
                label="Last name"
                variant="outlined"
                fullWidth required
                sx={{marginTop: 2, 
                    marginBottom: 2, 
                    width: 800,

                 }}
                value={lastName}
                onChange={(e)=> {setLastName(e.target.value)}}
                error={!!errors.lastName}  // two exlamations marks to convert the string to boolean
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
                    type="date"
                    variant="outlined"
                    fullWidth required
                    sx={{marginTop: 2, 
                        marginBottom: 2, 
                        width: 800,

                     }}
                    value={dateOfBirth ? new Date(dateOfBirth) : ''} // Convert the date to a string
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e)=> {
                        const enteredDate =  e.target.value;
                        const formattedDate = enteredDate ? new Date(enteredDate) : null;
                        setDateOfBirth(formattedDate);
                    }
                    }
                    error={!!errors.dateOfBirth}  // two exlamations marks to convert the date to boolean
                
                />
                {/* Display errors for the date of birth field */}
                { errors.dateOfBirth && (
                    <span style={{color:'red'}}>{errors.dateOfBirth}</span>
                )}
                <StyledTextField 
                label="Residential Address" 
                variant="outlined" 
                fullWidth required 
                sx={{marginTop: 2, 
                    marginBottom: 2, 
                    width: 800,

                 }}
                value={residentialAddress}
                onChange={(e)=> {setResidentialAddress(e.target.value)}}
                error={!!errors.residentialAddress}  // two exlamations marks to convert the string to boolean
                />
                {/* Display errors for the residential address field */}
                { errors.residentialAddress && (
                    <span style={{color:'red'}}>{errors.residentialAddress}</span>
                )}
                <StyledTextField 
                label="Email" 
                variant="outlined" 
                sx={{marginTop: 2, 
                    marginBottom: 2, 
                    width: 800,

                 }}
                fullWidth required 
                value={email}
                onChange={(e)=> {setEmail(e.target.value)}}
                error={!!errors.email}  // two exlamations marks to convert the string to boolean
                />
                {/* Display errors for the email field */}
                { errors.email && (
                    <span style={{color:'red'}}>{errors.email}</span>
                )}
                <StyledTextField
                label="Phone number"
                variant="outlined"
                fullWidth required
                sx={{marginTop: 2, 
                    marginBottom: 2, 
                    width: 800,

                 }}
                value={phoneNumber}
                onChange={(e)=> {setPhoneNumber(e.target.value)}}
                error={!!errors.phoneNumber}  // two exlamations marks to convert the string to boolean
                />
                {/* Display errors for the phone number field */}
                { errors.phoneNumber && (
                    <span style={{color:'red'}}>{errors.phoneNumber}</span>
                )}
                {/* SECTION 2 */}
                <Typography variant="h5">Employment details</Typography>
                <StyledRadioGroup value={employmentStatus} onChange={(e)=>{setEmploymentStatus(e.target.value)}} > 
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
                        sx={{marginTop: 2, 
                            marginBottom: 2, 
                            width: 800,
    
                         }}
                        value={employerName}
                        error={!!errors.employerName}  // two exlamations marks to convert the string to boolean
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
                        sx={{marginTop: 2, 
                            marginBottom: 2, 
                            width: 800,
    
                         }}
                        value={employerEmail}
                        error={!!errors.employerEmail}  // two exlamations marks to convert the string to boolean
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
                        sx={{marginTop: 2, 
                            marginBottom: 2, 
                            width: 800,
    
                         }}
                        value={employerPhoneNumber}
                        error={!!errors.employerPhoneNumber}  // two exlamations marks to convert the string to boolean
                        onChange={(e)=> {setEmployerPhoneNumber(e.target.value)}}
                        required={employmentStatus === "Employed"}
                        />
                        { errors.employerPhoneNumber && (
                            <span style={{color:'red'}}>{errors.employerPhoneNumber}</span>
                        )}
                    </>
                
                )}
                
                {/* SECTION 3 */}
                <Typography variant="h5">Next of kin details</Typography>
                <StyledTextField
                label="Next of Kin"
                variant="outlined"
                fullWidth required
                sx={{marginTop: 2, 
                    marginBottom: 2, 
                    width: 800,

                 }}
                value={nextOfKin}
                onChange={(e)=> {setNextOfKin(e.target.value)}}
                error={!!errors.nextOfKin}  // two exlamations marks to convert the string to boolean
                />
                {/* Display errors for the next of kin field */}
                { errors.nextOfKin && (
                    <span style={{color:'red'}}>{errors.nextOfKin}</span>
                )}
                <StyledTextField
                label="Next of Kin Email"
                variant="outlined"
                fullWidth required
                sx={{marginTop: 2, 
                    marginBottom: 2, 
                    width: 800,

                 }}
                value={nextOfKinEmail}
                onChange={(e)=> {setNextOfKinEmail(e.target.value)}}
                error={!!errors.nextOfKinEmail}  // two exlamations marks to convert the string to boolean
                />
                {/* Display errors for the next of kin email field */}
                { errors.nextOfKinEmail && (
                    <span style={{color:'red'}}>{errors.nextOfKinEmail}</span>
                )}
                <StyledTextField
                label="Next of Kin Phone number"
                variant="outlined"
                fullWidth required
                sx={{marginTop: 2, 
                    marginBottom: 2, 
                    width: 800,

                 }}
                value={nextOfKinPhoneNumber}
                onChange={(e)=> {setNextOfKinPhoneNumber(e.target.value)}}
                error={!!errors.nextOfKinPhoneNumber}  // two exlamations marks to convert the string to boolean
                />
                {/* Display errors for the next of kin phone number field */}
                { errors.nextOfKinPhoneNumber && (
                    <span style={{color:'red'}}>{errors.nextOfKinPhoneNumber}</span>
                )}
                <StyledButton variant="contained" type="submit"
                >Update</StyledButton>
            </form>
        </div>
     );
}
 
export default UpdateMemberData;