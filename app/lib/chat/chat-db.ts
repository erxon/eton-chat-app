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
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function getAllChats() {
  try {
    await dbConnect();
    const chats = await Chat.find();
    
    return chats;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
