import mongoose from "mongoose";

interface Notifications {
    from: mongoose.Schema.Types.ObjectId,
    to: mongoose.Schema.Types.ObjectId,
    message: String,
    dateCreated: Date;
    dateModified: Date;
}

const notificationSchema = new mongoose.Schema<Notifications>({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: String,
    dateCreated: Date,
    dateModified: Date
});


export default mongoose.models.Notification || mongoose.model<Notifications>("Notification", notificationSchema);