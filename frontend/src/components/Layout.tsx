import { DashboardOutlined,AccountCircleOutlined,CreditCardOutlined,
    PaymentOutlined,LogoutOutlined,AssignmentIndOutlined, GroupOutlined, 
    MoneyOffCsredOutlined, MonetizationOnOutlined, NotificationsActiveOutlined, 
    PersonOutlineOutlined, PeopleOutlined, CreditScoreOutlined, RequestPageOutlined, 
    VisibilityOutlined, 
    PreviewOutlined} from "@mui/icons-material";
import { Drawer, Typography, List, ListItem, ListItemIcon,ListItemText,
    AppBar,Toolbar, Button, IconButton, Badge, Tooltip } from "@mui/material";
import { useNavigate,useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/system";
import React,{useEffect, useState} from 'react';
import useAuthContext from "../hooks/UseAuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import NotificationsPanel from "./NotificationPanel";



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
        icon: <PersonOutlineOutlined color="primary"/>,
        path:'/profile'
    },
    {
        text:'Account',
        icon: <AccountCircleOutlined color="primary" />,
        path:'/memberaccount'
    },
    {
        text:'Member Accounts',
        icon: <PeopleOutlined color="primary"/>,
        path:'/memberaccounts'
    },
    {
        text:'Loans',
        icon: <CreditCardOutlined color="primary" />,
        path:'/loans',
        subItems: [
            {
                text:'Request Loan',
                icon: <RequestPageOutlined color="primary"/>,
                path:'/requestloan'
            },
            {
                text:'View Loan requests ',
                icon: <VisibilityOutlined color="primary"/>,
                path:'/loanrequests'
            },
            {
                text:'View approved Loan ',
                icon: <PreviewOutlined color="primary"/>,
                path:'/loans'
            }
        ]
    },
    {
        text:'Transactions',
        icon: <CreditScoreOutlined color="primary"/>,
        path:'/transactions',
        subItems: [
            {
                text: 'Make transaction',
                icon: <MoneyOffCsredOutlined color="primary"/>,
                path: '/maketransaction'
            },
            {
                text: 'View transactions',
                icon: <VisibilityOutlined color="primary"/>,
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
        text:'Notifications',
        icon: <NotificationsActiveOutlined color="primary"/>,
        path:'/notifications'
    },
    {
        text:'Members',
        icon: <GroupOutlined color="primary"/>,
        path:'/members'
    }
]

interface Notification {
    _id:string,
    member:{
        _id:string,
        firstName:string,
        lastName:string,
        email:string
    },
    notificationType:string,
    notificationRead:boolean,
    notificationContent:string,
    createdAt:Date
}

const Layout = ({children}:{children:React.ReactNode}):JSX.Element => {
    const {member,dispatch} = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();

    if(!member){
        navigate('/login');
    }

    const [showLoansSubMenu, setShowLoansSubMenu] = useState<boolean>(false);
    const [showTransactionsSubMenu, setShowTransactionsSubMenu] = useState<boolean>(false)
    // state to handle the visibility of the notifications panel
    const [showNotifications, setShowNotifications] = useState<boolean>(false);
    // state to store the notifications
    const [notifications, setNotifications] = useState<Notification[]>([]);
    // state to store unread notifications
    const [unreadNotifications, setUnreadNotifications] = useState<Notification[]>([]);

    // fetch the notifications
    useEffect(()=>{
        const fetchNotifications = async() =>{
            const allNotifications = await axios.get('http://localhost:4343/api/notifications/',{
                headers:{
                    'Authorization': `Bearer ${member.token}`
                }
            });
            if(allNotifications.status === 200){
                const data : Notification[] = allNotifications.data
                const unread = data.filter(notification => notification.notificationRead === false );
                setNotifications(data);
                setUnreadNotifications(unread);
            }
        }
        if(member){
            fetchNotifications();
        }
    },[member]);

    const handleLoansClick = () =>{
        setShowLoansSubMenu(!showLoansSubMenu);
        setShowTransactionsSubMenu(false); // close transactions sub menu
    }

    const handleTransactionsClick = () =>{
        setShowTransactionsSubMenu(!showTransactionsSubMenu);
        setShowLoansSubMenu(false); // close loans sub menu
    }

    const handleNotificationsClick = async() =>{
        setShowNotifications(!showNotifications);
        // change the read status of the notifications
        try {
            if(!member){
                return
            }
            const changeStatus = await axios.get('http://localhost:4343/api/notifications/changestatus',{
                headers:{
                    'Authorization' : `Bearer ${member.token}`
                }
            });
            if(changeStatus.status === 200){
                console.log(changeStatus.data);
            }
        } catch (error) {
            console.log(error);
        }
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
                        <div style={{ display: "flex"}}>
                            <Tooltip title="View notifications">
                                <IconButton color="primary" 
                                    onClick={handleNotificationsClick} 
                                    style={{ marginRight:"20px" }}>
                                        <Badge badgeContent={unreadNotifications?.length} color="error">
                                            <NotificationsActiveOutlined />
                                        </Badge>
                                </IconButton>
                            </Tooltip>
                            <Typography variant="h5">{member.firstName}</Typography>
                        </div>
                    )}
                    <Button onClick={handleLogout} variant="outlined"
                    style={{ marginLeft: '10px'}}
                    >Log out</Button>
                </Toolbar>
            </StyledAppBar>
            {/* Display Notifications */}
            {showNotifications && (
                <NotificationsPanel
                    notifications={notifications}
                    closePanel={() => setShowNotifications(false)}
                />
            )}
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
                                        onClick={item.text === 'Loans' ? handleLoansClick : (item.text === 'Transactions' ? handleTransactionsClick : undefined)}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText secondary={item.text} />
                                    </ListItem>
                                    {item.text === 'Loans' && showLoansSubMenu && (
                                        <List style={{ marginLeft: "20px" }}>
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
                                    {item.text === 'Transactions' && showTransactionsSubMenu && (
                                        <List style={{ marginLeft: "20px" }}>
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