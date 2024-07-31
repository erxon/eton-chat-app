import mongoose from "mongoose";

export interface Channels extends mongoose.Document {
  name: mongoose.Schema.Types.String;
  members: mongoose.Schema.Types.Array;
  userId: mongoose.Schema.Types.ObjectId;
  contact: mongoose.Schema.Types.ObjectId;
  status: String;
  chat: [mongoose.Schema.Types.ObjectId];
  dateCreated: Date;
  dateModified: Date;
}

const channelSchema = new mongoose.Schema<Channels>({
  name: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: {
    type: String,
    enum: ["pending", "active"],
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
