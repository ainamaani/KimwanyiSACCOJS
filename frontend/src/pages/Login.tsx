import { Typography,TextField,Button } from "@mui/material";
import { styled } from "@mui/styles";
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import useAuthContext from "../hooks/UseAuthContext";
import { useNavigate } from "react-router-dom";


const StyledTextField = styled(TextField)({
    marginTop: '20px',
    marginBottom: '20px',
    display: 'block'
});

const StyledButton = styled(Button)({
    marginTop: '20px',
    marginBottom: '20px',
    display: 'block'
})

const Login = ():JSX.Element => {
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
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
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }   
    }

    return ( 
        <div>
            <Typography variant="h4">Login</Typography>
            <form autoCorrect="off" noValidate onSubmit={handleLogin}>
                <StyledTextField 
                    label="Email"
                    variant="outlined"
                    required fullWidth
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                <StyledTextField 
                    label="Password"
                    variant="outlined"
                    required fullWidth
                    type="password"
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <StyledButton variant="contained" type="submit">Login</StyledButton>
            </form>
        </div>

     );
}
 
export default Login;