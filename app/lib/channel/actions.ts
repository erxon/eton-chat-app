'use server';

import { editChannel } from "../database/channel-db";

export async function activateChannel(channelName: string) {
  try {
    await editChannel({ status: "active" }, channelName);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
