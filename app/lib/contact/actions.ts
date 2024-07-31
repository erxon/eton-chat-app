"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { create } from "../database/channel-db";

export async function createChannel(
  userID: string,
  otherUserID: string,
  query: string
) {
  try {
    await create(userID, otherUserID);
    console.log("success")
  } catch (error) {
    throw new Error(`${error}`);
  }

  revalidatePath(`/welcome/find?query=${query}`);
  redirect(`/welcome/find?query=${query}`);
}
