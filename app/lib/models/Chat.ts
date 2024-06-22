import mongoose from "mongoose";

export interface Chats extends mongoose.Document {
  from: mongoose.Schema.Types.ObjectId;
  message: String;
  dateCreated: Date;
  dateModified: Date;
}

const chatSchema = new mongoose.Schema<Chats>({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: String,
  dateCreated: new Date(),
  dateModified: Date,
});

export default mongoose.models.Chat ||
  mongoose.model<Chats>("Chat", chatSchema);
