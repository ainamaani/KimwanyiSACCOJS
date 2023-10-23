import { Typography } from "@mui/material";
import useAuthContext from "../hooks/UseAuthContext";

const Home = ():JSX.Element => {
    const { member } = useAuthContext();
    return ( 
        <div>
            <Typography variant="body1">Welcome to Kimwanyi Sacco home page</Typography>

            { member && (
                <h3>Welcome {member.firstName}</h3>
            )}

        </div>
     );
}
 
export default Home;