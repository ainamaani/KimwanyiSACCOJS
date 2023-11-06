import { Typography } from "@mui/material";
import useAuthContext from "../hooks/UseAuthContext";
import { Link } from "react-router-dom";

const Home = ():JSX.Element => {
    const { member } = useAuthContext();
    return ( 
        <div>
            <div className="navbar">
                <div>
                    <Typography variant="h5">Kimwanyi SACCO</Typography>
                </div>
                <div className="links">
                    <Link to={'/apply'}>Apply</Link>
                    <Link to={'/login'}>Login</Link>
                </div>
            </div>
            <div className="content">
                <div className="head">
                    <div className="welcome">
                        <Typography className="msg" variant="h5">Welcome to <span className="inner">Kimwanyi SACCO</span></Typography>
                        <Link style={{
                            textDecoration: 'none',
                            color: '#fff',
                            backgroundColor: '#0095ff', 
                            padding: '5px',
                            borderRadius: '4px',
                            fontSize: '1.2em',
                            marginTop: '35px',
                            margin: '5px',
                        }} to={'/apply'}>Apply for membership</Link>
                    </div>
                    <div className="sacco-image">
                        <img src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U2F2aW5nc3xlbnwwfHwwfHx8MA%3D%3D" alt="SACCO" />
                    </div>
                </div>
            </div>

        </div>
     );
}
 
export default Home;