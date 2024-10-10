"use server";

import { editChannel } from "../database/channel-db";

export async function activateChannel(userID: string, userToAccept: string) {
  try {
    await editChannel(userID, userToAccept, { status: "active" });
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
