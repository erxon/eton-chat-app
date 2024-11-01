"use server";

import Channel from "../models/Channel";

export interface ChatInterface {
  id?: string;
  from?: string;
  to?: string;
  state?: string;
  message?: String;
  dateCreated?: Date;
  dateModified?: Date;
}

export async function fetchChat(channelId: string, userId: string) {
  try {
    const channel = await Channel.findById(channelId);
    const chats = channel.chat;

    const updatedChats = chats.map((item : any) => {
      if (item.to.toString() === userId && item.state === "unread"){
        item.state = "read";
      }

      return item;
    });
    
    channel.chat = chats;
    channel.save();

    const chat = channel.chat ? JSON.stringify(channel.chat) : "";

    return chat;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
