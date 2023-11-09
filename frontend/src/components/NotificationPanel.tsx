import React from 'react';
import { Paper, List, ListItem, ListItemText, Button } from '@mui/material';

interface Notification {
    _id:string,
    member:{
        _id:string,
        firstName:string,
        lastName:string,
        email:string
    },
    notificationType:string,
    notificationRead:string,
    notificationContent:string
}

interface NotificationProps {
    notifications: Notification[];
    closePanel: () => void;

}

const NotificationsPanel = ({ notifications , closePanel }:NotificationProps):JSX.Element => {
  return (
    <Paper style={{ position: 'absolute', top: '65px', right: '10px' }}>
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification._id}>
            <ListItemText primary={notification.notificationContent} />
          </ListItem>
        ))}
      </List>
      <Button onClick={closePanel}>Close</Button>
    </Paper>
  );
};

export default NotificationsPanel;
