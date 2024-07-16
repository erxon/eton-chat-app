import dbConnect from "../db-connect";
import Chat from "../models/Chat";

interface Message {
  from: string;
  message: string;
}

export async function insert(message: Message) {
  try {
    const newMessage = new Chat({ ...message, dateCreated: new Date() });
    await newMessage.save();

    return true;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
