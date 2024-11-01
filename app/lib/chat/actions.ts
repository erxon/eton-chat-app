"use server";

import { insert } from "../database/chat-db";
import { auth } from "@/auth";
import { fetchUser, fetchUserByEmail } from "../user/data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addNewChat, editChannel } from "../database/channel-db";

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
    await insert({message : message, from : from, to: contact }, channelId, isContactPresent);
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

