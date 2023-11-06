const mongoose = require('mongoose');
const Member = require('./Member');

const NotificationSchema = new mongoose.Schema({
    member:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Member,
        required:[true, "The member to receive the notification is required"]
    },
    notificationType:{
        type:String,
        required:[true, "The notification type is required"]
    },
    notificationRead:{
        type:Boolean,
        required: [true, "The read status is required"],
        default: false
    },
    notificationContent:{
        type:String,
        required: [true, "The notification content is required"]
    }

},{timestamps:true});

module.exports = mongoose.model('Notification',NotificationSchema);