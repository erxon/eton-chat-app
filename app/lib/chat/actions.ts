"use server";

import { insert } from "./chat-db";
import { z } from "zod";
import { auth } from "@/auth";
import { fetchUserByEmail } from "../data";

//Message Interface

const ChatSchema = z.object({
  message: z.string({
    invalid_type_error: "Invalid or Empty message",
  }),
});

export async function addChat(message: string) {
  const session = await auth();
  const user = await fetchUserByEmail(session?.user?.email);

  try {
    const result = await insert({message: message, from: user?.id});
    return result;
  } catch (error) {
    return "Failed to send message";
  }
}
