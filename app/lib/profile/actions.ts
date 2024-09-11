"use server";

import { revalidatePath } from "next/cache";
import { addContacts, removeContact } from "../database/profile-db";
import { redirect } from "next/navigation";
import { Channel, fetchChannelByMembers } from "../channel/data";
import { editChannel } from "../database/channel-db";

export async function contactRequestAccepted(
  inviter: string,
  accepter: string,
  query: string
) {
  try {
    await addContacts(inviter, accepter);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  revalidatePath(`/welcome/find?query=${query}`);
  redirect(`/welcome/find?query=${query}`);
}

export async function inactivateChannel(userID: string, contact: string) {
  try {
    const channel = await fetchChannelByMembers(userID, contact);
    if (channel) {
      await editChannel({ status: "inactive" }, channel?.name);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function removeFromEachContacts(userID: string, contact: string) {
  try {
    await removeContact(userID, contact);
    await removeContact(contact, userID);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function removeFromContact(
  userID: string,
  contact: string,
  query: string
) {
  try {
    await inactivateChannel(userID, contact);
    await removeFromEachContacts(userID, contact);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
  
  revalidatePath(`/welcome/find?query=${query}`);
  redirect(`/welcome/find?query=${query}`);
}
