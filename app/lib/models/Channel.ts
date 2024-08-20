import mongoose from "mongoose";

export interface Channels extends mongoose.Document {
  name: mongoose.Schema.Types.String;
  members: mongoose.Schema.Types.Array;
  requestedBy: mongoose.Schema.Types.ObjectId;
  requestedTo: mongoose.Schema.Types.ObjectId;
  contact: mongoose.Schema.Types.ObjectId;
  status: String;
  chat: [mongoose.Schema.Types.ObjectId];
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
  chat: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Chat",
  },
  dateCreated: Date,
  dateModified: Date,
});

export default mongoose.models.Channel ||
  mongoose.model<Channels>("Channel", channelSchema);
