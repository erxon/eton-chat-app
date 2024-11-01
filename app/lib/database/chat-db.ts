"use server";

import dbConnect from "../db-connect";
import Channel from "../models/Channel";

interface Message {
  from: string;
  to: string;
  message: string;
}

export async function insert(
  message: Message,
  channelId: string,
  isContactPresent: boolean
) {
  try {
    const channel = await Channel.findById(channelId);
    const chat = channel.chat;

    isContactPresent
      ? chat.push({ ...message, state: "read", dateCreated: new Date() })
      : chat.push({ ...message, state: "unread", dateCreated: new Date() });

    channel.dateModified = new Date();
    await channel.save();
  } catch (error) {
    throw new Error(`${error}`);
  }
}
