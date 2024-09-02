"use server";

import { insert } from "../database/chat-db";
import { auth } from "@/auth";
import { fetchUser, fetchUserByEmail } from "../user/data";
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
