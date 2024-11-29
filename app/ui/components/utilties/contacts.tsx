"use server";

import { activateChannel } from "@/app/lib/channel/actions";
import { contactRequestAccepted } from "@/app/lib/profile/actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function acceptRequest(
  currentUser: string,
  userID: string,
  query?: string
) {
  const currentLoggedInUser = currentUser;
  const userToAccept = userID;

  try {
    // activate the channel
    await activateChannel(currentLoggedInUser, userToAccept);
    // accept contact request
    await contactRequestAccepted(userToAccept, currentLoggedInUser);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  if (query) {
    revalidatePath(`/welcome/find?query=${query}`);
    redirect(`/welcome/find?query=${query}`);
  } else {
    revalidatePath(`/welcome/contacts`);
    redirect(`/welcome/contacts/requests`);
  }
}
