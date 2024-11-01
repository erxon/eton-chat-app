import mongoose from "mongoose";
import chatSchema from "./Chat";

export interface Channels extends mongoose.Document {
  name: mongoose.Schema.Types.String;
  members: mongoose.Schema.Types.Array;
  requestedBy: mongoose.Schema.Types.ObjectId;
  requestedTo: mongoose.Schema.Types.ObjectId;
  contact: mongoose.Schema.Types.ObjectId;
  status: String;
  chat: [];
  dateCreated: Date;
  dateModified: Date;
}

const channelSchema = new mongoose.Schema<Channels>({
  name: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  requestedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "active", "inactive"],
  },
  chat: [chatSchema],
  dateCreated: Date,
  dateModified: Date,
});

const Channel =
  mongoose.models.Channel || mongoose.model<Channels>("Channel", channelSchema);

export default Channel;
