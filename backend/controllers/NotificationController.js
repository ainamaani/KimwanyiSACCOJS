const Notification = require('../models/Notification');

const createNotification = async(req,res) =>{
    const { notificationType,  notificationContent } = req.body;

    try {
        const newNotification = await Notification.create({ notificationType, notificationContent });
        if(newNotification){
            return res.status(200).json(newNotification);
        }else{
            return res.status(400).json({ error: "Failed to create new notificaton" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getMemberNotifications = async(req,res) =>{
    const { id } = req.params;

    try {
        const memberNotifications = await Notification.find({ member:id }).sort({ createdAt:-1 });
        if(memberNotifications){
            return res.status(200).json(memberNotifications);
        }else{
            return res.status(400).json({ error: "Failed to fetch the member notifications"});
        }
    } catch (error) {
        return res.status(400).json({ error: error.message});
    }
}

module.exports = {
    createNotification,
    getMemberNotifications
}