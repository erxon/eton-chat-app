'use server';

import Channel from "../models/Channel";

export interface ChatInterface {
  id?: string,
  from?: string,
  message?: String,
  dateCreated?: Date,
  dateModified?: Date,
}


export async function fetchChat(channelId: string){
  try {
    const channel = await Channel.findById(channelId);
    const chat = channel.chat ? JSON.stringify(channel.chat) : "";

    return chat;
  } catch (error) {
    if (error instanceof Error){
      throw new Error(error.message);
    }
  }
}