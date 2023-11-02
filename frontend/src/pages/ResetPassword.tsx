import { Button, TextField, Typography } from "@mui/material";
import React,{useState,useEffect} from 'react';
import axios from 'axios';

const ResetPassword = ():JSX.Element => {
    const [memberEmail, setMemberEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleEmailConfirmation = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        try {
            const confirmEmail = await axios.post('http://localhost:4343/api/auth/verifyemail',
                                JSON.stringify({ memberEmail }),{
                                    headers:{
                                        'Content-Type':'application/json'
                                    }
                                }  
            )
            if(confirmEmail.status === 200){
                console.log(confirmEmail.data);
            }
        } catch (error : any) {
            if(error.response && error.response.data && error.response.data.error){
                setError(error.response.data.error);
            }
        }
    }

    return ( 
        <div>
            <Typography variant="h5"> Reset password </Typography>
            <form autoComplete="off" noValidate onSubmit={handleEmailConfirmation}>
                <TextField 
                    label="Enter your email"
                    variant="outlined"
                    fullWidth required
                    sx={{
                        marginTop:2,
                        marginBottom:2,
                        width: 600,
                        display: 'block'
                    }}
                    value={memberEmail}
                    onChange={(e)=>{setMemberEmail(e.target.value)}}
                />
                <Button variant="contained" type="submit"
                    sx={{marginTop: 2, 
                        marginBottom: 2, 
                        display: 'block'
                        
                    }}
                >Confirm Email</Button>
                { error && <span style={{color:"red"}}>{error}</span> }
            </form>
        </div>
     );
}
 
export default ResetPassword;