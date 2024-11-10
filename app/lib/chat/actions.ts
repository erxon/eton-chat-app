"use server";

import { Channel as ChannelInterface } from "../channel/data";
import { ChatInterface } from "./data";
import { insert } from "../database/chat-db";
import Channel from "../models/Channel";
import { fetchUser, fetchUserByEmail } from "../user/data";
import { revalidatePath } from "next/cache";

//Message Interface

export async function findUser(term: string) {
  try {
    if (term !== "") {
      const result = await fetchUser(term);
      return result;
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function sendChat(
  message: string,
  from: string,
  channelId: string,
  contact: string,
  isContactPresent: boolean
) {
  //get the chat
  try {
    //save the chat to chat collection
    await insert(
      { message: message, from: from, to: contact },
      channelId,
      isContactPresent
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  revalidatePath("/welcome/chat");
}

export async function updateChat(
  channelId: string,
  chatId: string,
  update: any
) {
  try {
    const channel = await Channel.findById(channelId);

    if (channel) {
      const chat: any = channel.chat.find((item: ChatInterface) => {
        return item.id === chatId;
      });

      if (chat) {
        const updatedChat = { ...chat, ...update };
        const filterChats: any = channel.chat.filter((item: ChatInterface) => {
          return item.id !== chatId;
        });
        const pushUpdatedChat = filterChats.push(updatedChat);

        channel.chat = pushUpdatedChat;
        await channel.save();
      }
    }
    return true;
  } catch (error) {
    throw new Error("something went wrong");
  }
}
