import { DashboardOutlined,AccountCircleOutlined,CreditCardOutlined,
    PaymentOutlined,LogoutOutlined,AssignmentIndOutlined, GroupOutlined, MoneyOffCsredOutlined, MonetizationOnOutlined } from "@mui/icons-material";
import { Drawer, Typography, List, ListItem, ListItemIcon,ListItemText,
    AppBar,Toolbar, Button } from "@mui/material";
import { useNavigate,useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/system";
import React,{useState} from 'react';
import useAuthContext from "../hooks/UseAuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
        text:'Account',
        icon: <AccountCircleOutlined color="primary" />,
        path:'/memberaccount'
    },
    {
        text:'Member Accounts',
        icon: <AccountCircleOutlined color="primary" />,
        path:'/memberaccounts'
    },
    {
        text:'Loans',
        icon: <CreditCardOutlined color="primary" />,
        path:'/loans',
        subItems: [
            {
                text:'Request Loan',
                icon: <AssignmentIndOutlined color="primary" />,
                path:'/requestloan'
            },
            {
                text:'View Loan requests ',
                icon: <AssignmentIndOutlined color="primary" />,
                path:'/loanrequests'
            }
        ]
    },
    {
        text:'Transactions',
        icon: <PaymentOutlined color="primary" />,
        path:'/transactions',
        subItems: [
            {
                text: 'Make transaction',
                icon: <MoneyOffCsredOutlined color="primary"/>,
                path: '/maketransaction'
            },
            {
                text: 'View transactions',
                icon: <MonetizationOnOutlined color="primary"/>,
                path: '/transactions'
            }
        ]
    },
    {
        text:'Applications',
        icon: <AssignmentIndOutlined color="primary" />,
        path:'/applications'
    },
    {
        text:'Members',
        icon: <GroupOutlined color="primary"/>,
        path:'/members'
    },
    {
        text:'Logout',
        icon: <LogoutOutlined color="primary" />,
        path:'/logout'
    }
]

const Layout = ({children}:{children:React.ReactNode}):JSX.Element => {
    const {member,dispatch} = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();

    const [showLoansSubMenu, setShowLoansSubMenu] = useState<boolean>(false);

    const handleLoansClick = () =>{
        
        setShowLoansSubMenu(!showLoansSubMenu);
    }

    const handleLogout = () =>{
        // delete the token from the local storage
        localStorage.removeItem('member');
        // update the auth API context
        dispatch({ type:'LOGOUT' });
        // redirect to the login page
        navigate('/login');
        // show feedback after log out
        toast.success("Logged out successfully",{
            position: "top-right"
        })
    }

    return ( 
        <div className="root" style={{display:'flex'}}>
            {/* AppBar */}
            <StyledAppBar>
                <Toolbar>
                    <Typography variant="h5" className={classes.appbarTitle}>
                        Kimwanyi SACCO
                    </Typography>
                    { member && (
                        <Typography variant="h5">{member.firstName}</Typography>
                    )}
                    <Button onClick={handleLogout} variant="outlined"
                    style={{ marginLeft: '10px'}}
                    >Log out</Button>
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
                    {menuItems.map(item => (
                        <div key={item.text}>
                            {item.subItems ? (
                                // Render sub-menu items
                                <>
                                    <ListItem button 
                                    onClick={handleLoansClick}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText secondary={item.text} />
                                    </ListItem>
                                    {showLoansSubMenu && (
                                        <List style={{ marginLeft:"20px" }}>
                                            {item.subItems.map(subItem => (
                                                <ListItem
                                                    key={subItem.text}
                                                    button
                                                    onClick={() => navigate(subItem.path)}
                                                    className={location.pathname === subItem.path ? classes.active : undefined}
                                                >
                                                    <ListItemIcon>{subItem.icon}</ListItemIcon>
                                                    <ListItemText secondary={subItem.text} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    )}
                                </>
                            ) : (
                                // Render top-level menu items
                                <ListItem button onClick={() => navigate(item.path)} className={location.pathname === item.path ? classes.active : undefined}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText secondary={item.text} />
                                </ListItem>
                            )}
                        </div>
                    ))}
                </List>
            </Drawer>
            <div className={classes.page}>
                    {children}
            </div>
        </div>
     );
}


 
export default Layout;