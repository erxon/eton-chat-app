import dbConnect from "../db-connect";
import Chat from "../models/Chat";

interface Message {
  from: string;
  message: string;
}

export async function insert(message: Message) {
  try {
    const newMessage = new Chat({ ...message, dateCreated: new Date() });
    const data = await newMessage.save();
    return data.id;

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

export async function getChat(chatId : string) {
  try {
    const chat = await Chat.findById(chatId);
    return chat;

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
