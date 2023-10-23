import { Typography } from "@mui/material";
import useAuthContext from "../hooks/UseAuthContext";

const Home = ():JSX.Element => {
    const { user } = useAuthContext();
    return ( 
        <div>
            <Typography variant="body1">Welcome to Kimwanyi Sacco home page</Typography>

            { user && (
                <h3>Welcome {user.firstName}</h3>
            )}

        </div>
     );
}
 
export default Home;