import { TextField, Typography,Button,Input } from "@mui/material";
import { styled } from "@mui/system";
import React,{useState,useEffect} from 'react';

const StyledTextField = styled(TextField)({
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
})

const StyledInput = styled(Input)({
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
})

const StyledButton = styled(Button)({
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
})

const SetAccount = ():JSX.Element => {

    const [profilePic,setProfilePic] = useState<File | null>(null);
    const [password,setPassword] = useState<string>('');
    const [passwordConfirm,setPasswordConfirm] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        if(e.target.files && e.target.files.length > 0){
            setProfilePic(e.target.files[0]);
        }
    }

    const handleDetailsSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(profilePic,password,passwordConfirm);
    }

    return ( 
        <div>
            <Typography variant="body1"> Please reset password and upload a profile pic</Typography>
            
            <form autoComplete="off" noValidate onSubmit={handleDetailsSubmit}>
                <StyledInput 
                type="file"
                inputProps={{
                    accept: '.png,.jpeg,.jpg'
                }}
                onChange={handleFileChange}
                />
                <StyledTextField 
                    label="Password" variant="outlined"
                    fullWidth required
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    type="password"
                />
                <StyledTextField 
                    label="Confirm password" variant="outlined"
                    fullWidth required
                    value={passwordConfirm}
                    onChange={(e)=>{setPasswordConfirm(e.target.value)}}
                    type="password"
                />
                <StyledButton variant="contained" type="submit">Change</StyledButton>
            </form>
        </div>
     );
}
 
export default SetAccount;