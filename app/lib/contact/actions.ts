"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { create, deleteChannelByName } from "../database/channel-db";

export async function createChannel(
  userID: string,
  otherUserID: string,
  query: string
) {
  try {
    await create(userID, otherUserID);
    console.log("success");
  } catch (error) {
    throw new Error(`${error}`);
  }

  revalidatePath(`/welcome/find?query=${query}`);
  redirect(`/welcome/find?query=${query}`);
}

export async function deleteChannel(name: string, query: string) {
  try {
    await deleteChannelByName(name);
  } catch (error) {
    throw new Error("Something went wrong. Please try again later");
  }
  revalidatePath(`/welcome/find?query=${query}`);
  redirect(`/welcome/find?query=${query}`);
}
