import { Button, TextField, Typography } from "@mui/material";
import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = ():JSX.Element => {
    const [memberEmail, setMemberEmail] = useState<string>('');
    const [resetPwordCode, setResetPwordCode] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [emailVerified, setEmailVerified] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('');
    const [resetPasswordError, setResetPasswordError] = useState<string>('');
    const navigate = useNavigate();


    const handleEmailConfirmation = async(e:React.MouseEvent<HTMLButtonElement>) =>{
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
                setEmailVerified(true);
                toast.success("Email verified, Check your email for a code",{
                    position: "top-right"
                })
            }
        } catch (error : any) {
            if(error.response && error.response.data && error.response.data.error){
                setEmailError(error.response.data.error);
            }
        }
    }

    const handleResetPassword = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        try {
            const resetMemberPassword = await axios.post('http://localhost:4343/api/auth/forgotpassword',
                                            JSON.stringify({ memberEmail,resetPwordCode,newPassword }),{
                                                headers:{
                                                    'Content-Type':'application/json'
                                                }
                                            }
            )
            if(resetMemberPassword.status === 200){
                setMemberEmail('');
                setNewPassword('');
                setResetPwordCode('');
                setEmailVerified(false);
                navigate('/login');
            }
        } catch (error : any) {
            if(error.response && error.response.data && error.response.data.error){
                setResetPasswordError(error.response.data.error);
            }
        }

    }

    return ( 
        <div>
            <form autoComplete="off" noValidate onSubmit={handleResetPassword}>
                <Typography variant="h5"> Reset password </Typography>
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
                <Button variant="contained" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleEmailConfirmation(e)}
                    sx={{marginTop: 2, 
                        marginBottom: 2, 
                        display: 'block'
                        
                    }}
                >Confirm Email</Button>
                { emailError && <span style={{color:"red"}}>{emailError}</span> }

                { emailVerified && (
                    <>
                        <TextField 
                        label="Enter token"
                        variant="outlined"
                        fullWidth required
                        sx={{
                            marginTop:2,
                            marginBottom:2,
                            width: 600,
                            display: 'block'
                        }}
                        value={resetPwordCode}
                        onChange={(e)=>{setResetPwordCode(e.target.value)}}
                    />
                        <TextField 
                            label="Enter new password"
                            variant="outlined"
                            fullWidth required
                            sx={{
                                marginTop:2,
                                marginBottom:2,
                                width: 600,
                                display: 'block'
                            }}
                            value={newPassword}
                            onChange={(e)=>{setNewPassword(e.target.value)}}
                        />
                        <Button variant="contained" type="submit"
                            sx={{marginTop: 2, 
                                marginBottom: 2, 
                                display: 'block' 
                            }}
                        >Reset password</Button>
                        { resetPasswordError && <span style={{color:"red"}}>{resetPasswordError}</span> }
                    </>
                )}
            </form>
        </div>
     );
}
 
export default ResetPassword;