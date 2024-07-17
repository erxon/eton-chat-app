"use server";

import { insert } from "./chat-db";
import { auth } from "@/auth";
import { fetchUserByEmail } from "../data";

//Message Interface



export async function addChat(message: string) {
  const session = await auth();
  const user = await fetchUserByEmail(session?.user?.email);

  try {
    await insert({ message: message, from: user?.id });
  } catch (error) {
    return "Something went wrong. Message not sent.";
  }
}
