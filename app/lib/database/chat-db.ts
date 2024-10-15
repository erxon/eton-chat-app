import dbConnect from "../db-connect";
import Channel from "../models/Channel";

interface Message {
  from: string;
  message: string;
}

export async function insert(message: Message, channelId: string) {
  try {
    const channel = await Channel.findById(channelId);
    const chats = channel.chat;
    chats.push({ ...message, dateCreated: new Date() });
    channel.chat = chats;
    await channel.save();
  } catch (error) {
    throw new Error(`${error}`);
  }
}
