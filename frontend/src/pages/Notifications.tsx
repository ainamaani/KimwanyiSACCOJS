import { Button, TextField, Typography } from "@mui/material";

const CreateNotification = () => {
    return ( 
        <div>
            <form autoComplete="off" noValidate>
                <Typography variant="h5">Create notification</Typography>
                <TextField 
                    label="Notification type"
                    fullWidth required
                    variant="outlined"
                    sx={{
                        marginTop: 2,
                        marginBottom: 2,
                        width: 600
                    }}
                />
                <TextField 
                    label="Notification content"
                    fullWidth required
                    variant="outlined"
                    sx={{
                        marginTop: 2,
                        marginBottom: 2,
                        width: 600
                    }}
                />
                <Button variant="contained" type="submit"
                    sx={{
                        marginTop: 2,
                        marginBottom: 2,
                        width: 600
                    }}
                >Send Notification</Button>
            </form>
        </div>
     );
}
 
export default CreateNotification;