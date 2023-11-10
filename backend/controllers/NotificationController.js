const Notification = require('../models/Notification');

const createNotification = async(req,res) =>{
    const { member, notificationType,  notificationContent } = req.body;

    try {
        const newNotification = await Notification.create({ member, notificationType, notificationContent });
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
        const memberNotifications = await Notification.find({ member:id }).sort({ createdAt:-1 }).populate('member');
        if(memberNotifications){
            return res.status(200).json(memberNotifications);
        }else{
            return res.status(400).json({ error: "Failed to fetch the member notifications"});
        }
    } catch (error) {
        return res.status(400).json({ error: error.message});
    }
}

const getAllNotifications = async(req,res) =>{
    try {
        const allNotifications = await Notification.find({});
        if(allNotifications){
            return res.status(200).json(allNotifications);
        }else{
            return res.status(400).json({ error: "Notifications failed to be fetched" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createNotification,
    getMemberNotifications,
    getAllNotifications
}