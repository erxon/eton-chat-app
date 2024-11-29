"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  create,
  deleteChannelByName,
  editChannel,
} from "../database/channel-db";
import { fetchChannelByMembers } from "../channel/data";

export async function createChannel(
  userID: string,
  otherUserID: string,
  query: string
) {
  try {
    //check if there is an existing channel
    const channel = await fetchChannelByMembers(userID, otherUserID);

    if (channel) {
      channel.requestedBy = userID;
      channel.requestedTo = otherUserID;
      channel.status = "pending";
      await channel.save();
    } else {
      await create(userID, otherUserID);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }

  revalidatePath(`/welcome/find?query=${query}`);
  redirect(`/welcome/find?query=${query}`);
}

export async function deleteChannel(
  userID: string,
  otherUserID: string,
  query?: string
) {
  try {
    await editChannel(userID, otherUserID, { status: "inactive" });
  } catch (error) {
    throw new Error("Something went wrong. Please try again later");
  }
  
  if (query) {
    revalidatePath(`/welcome/find?query=${query}`);
    redirect(`/welcome/find?query=${query}`);
  } else {
    revalidatePath(`/welcome/contacts/pending`);
    redirect(`/welcome/contacts/pending`);
  }
}
