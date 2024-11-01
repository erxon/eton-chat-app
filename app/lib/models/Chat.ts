import mongoose from "mongoose";

export interface Chats extends mongoose.Document {
  from: mongoose.Schema.Types.ObjectId;
  message: String;
  read: Boolean;
  dateCreated: Date;
  dateModified: Date;
}

const chatSchema = new mongoose.Schema<Chats>({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: String,
  read: Boolean,
  dateCreated: Date,
  dateModified: Date,
});

export default chatSchema;
