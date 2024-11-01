import mongoose from "mongoose";

export interface Chats extends mongoose.Document {
  from: mongoose.Schema.Types.ObjectId;
  to: mongoose.Schema.Types.ObjectId;
  message: String;
  state: String;
  dateCreated: Date;
  dateModified: Date;
}

const chatSchema = new mongoose.Schema<Chats>({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: String,
  state: {
    type: String,
    enum: ["read", "unread", "deleted"],
  },
  dateCreated: Date,
  dateModified: Date,
});

export default chatSchema;
