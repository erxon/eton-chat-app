import mongoose from "mongoose";

export interface Channels extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  contact: mongoose.Schema.Types.ObjectId;
  status: String;
  chat: [mongoose.Schema.Types.ObjectId];
  dateCreated: Date;
  dateModified: Date;
}

const channelSchema = new mongoose.Schema<Channels>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "active"],
  },
  chat: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Chat'
  },
  dateCreated: new Date(),
  dateModified: Date
});

export default mongoose.models.Channel ||
  mongoose.model<Channels>("Channel", channelSchema);
