"use server";

import { insert } from "./chat-db";
import { auth } from "@/auth";
import { fetchUserByEmail } from "../data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//Message Interface

export async function addChat(formData: FormData) {
  const session = await auth();
  const user = await fetchUserByEmail(session?.user?.email);

  const message = formData?.get("message") as string;

  try {
    await insert({ message: message, from: user?.id });
  } catch (error) {
    return "Something went wrong. Message not sent.";
  }

  revalidatePath("/welcome/chat");
  redirect("/welcome/chat");
}

export async function findUser(formData : FormData){
  const term = formData?.get("user") as string;
  console.log(term);
}
