import { DashboardOutlined,AccountCircleOutlined,CreditCardOutlined,
    PaymentOutlined,LogoutOutlined,AssignmentIndOutlined } from "@mui/icons-material";
import { Drawer, Typography, List, ListItem, ListItemIcon,ListItemText,
    AppBar,Toolbar } from "@mui/material";
import { useNavigate,useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/system";

const drawerWidth = 260;

const StyledAppBar = styled(AppBar)({
    backgroundColor: "#fff",
    color: "#000",
    width: `calc(100% - ${drawerWidth}px)`

})




const useStyles = makeStyles(()=>{
    return{
        drawer:{
            width:drawerWidth
        },
        drawerPaper:{
            width:drawerWidth
        },
        page:{
            width:'100%',
            padding: '20px',
            marginTop:'60px'
        },
        root:{
            display:'flex'
        },
        active:{
            background:'#f4f4f4'
        },
        title:{
            padding: '20px'
        },

        appbarTitle:{
            flexGrow: 1
        }
    }
})



const menuItems = [
    {
        text:'Dashboard',
        icon: <DashboardOutlined color="primary" />,
        path:'/dashboard'
    },
    {
        text:'Profile',
        icon: <AccountCircleOutlined color="primary" />,
        path:'/profile'
    },
    {
        text:'Loans',
        icon: <CreditCardOutlined color="primary" />,
        path:'/loans'
    },
    {
        text:'Transactions',
        icon: <PaymentOutlined color="primary" />,
        path:'/transactions'
    },
    {
        text:'Applications',
        icon: <AssignmentIndOutlined color="primary" />,
        path:'/applications'
    },
    {
        text:'Logout',
        icon: <LogoutOutlined color="primary" />,
        path:'/logout'
    }
]

const Layout = ({children}:{children:React.ReactNode}):JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();

    return ( 
        <div className="root" style={{display:'flex'}}>
            {/* AppBar */}
            <StyledAppBar>
                <Toolbar>
                    <Typography variant="h5" className={classes.appbarTitle}>
                        Kimwanyi SACCO
                    </Typography>
                    <Typography variant="h5">
                        Ainamaani
                    </Typography>
                </Toolbar>
            </StyledAppBar>
            {/* Drawer */}
            <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{
                paper:classes.drawerPaper
            }}
            >
                <div>
                    <Typography variant="h4" className={classes.title}>Kimwanyi SACCO</Typography>
                </div>
                {/* Links */}
                <List>
                    {
                        menuItems.map(item=>(
                            <ListItem
                            key={item.text}
                            button
                            onClick={()=> navigate(item.path)}
                            className={location.pathname === item.path ? classes.active : undefined }
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText secondary={item.text} />
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
            <div className={classes.page}>
                    {children}
            </div>
        </div>
     );
}


 
export default Layout;