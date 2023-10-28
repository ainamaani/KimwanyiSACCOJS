import { Typography,TextField,Button } from "@mui/material";
import { styled } from "@mui/styles";
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import useAuthContext from "../hooks/UseAuthContext";
import { useNavigate } from "react-router-dom";


const StyledTextField = styled(TextField)({
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
});

const StyledButton = styled(Button)({
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
})

const Login = ():JSX.Element => {
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [error,setError] = useState<string>('');
    const {dispatch} = useAuthContext();
    const navigate = useNavigate();

    const handleLogin = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const loginCredentials = { email,password };
        try {
            const response = await axios.post('http://localhost:4343/api/members/login',
                            JSON.stringify(loginCredentials),{
                                headers:{
                                    'Content-Type':'application/json'
                                }
                            }
            )
            if(response.status === 200){
                //save the user in local storage
                localStorage.setItem('member',JSON.stringify(response.data));

                //update the auth api context
                dispatch({type: 'LOGIN', payload: response.data});
                setEmail('');
                setPassword('');
                setError('');
                navigate('/');
            }
        } catch (error : any) {
            if(error.response && error.response.data && error.response.data.error){
                // set error in state
                setError(error.response.data.error);
            }else{
                console.log(error);
            }
        }   
    }

    return ( 
        <div>
            <form autoCorrect="off" noValidate onSubmit={handleLogin}>
            <Typography variant="h4">Login</Typography>
                <StyledTextField 
                    label="Email"
                    variant="outlined"
                    required fullWidth
                    sx={{marginTop: 2, 
                        marginBottom: 2, 
                        width: 600,
                        display: 'block'

                     }}
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                <StyledTextField 
                    label="Password"
                    variant="outlined"
                    required fullWidth
                    type="password"
                    sx={{marginTop: 2, 
                        marginBottom: 2, 
                        width: 600,
                        display: 'block'
                     }}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <StyledButton variant="contained" 
                sx={{marginTop: 2, 
                    marginBottom: 2, 
                    display: 'block'
                    
                 }}
                type="submit">Login</StyledButton>
                { error && <span style={{color:"red"}}>{error}</span>  }
            </form>
        </div>

     );
}
 
export default Login;