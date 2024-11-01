'use server';

import Channel from "../models/Channel";
import { unstable_noStore as noStore } from "next/cache";

export interface Channel {
  id: string;
  name: string;
  members: string[];
  requestedBy: string;
  requestedTo: string;
  userId: string;
  contact: string;
  status: string;
  chat: [];
  dateCreated: Date;
  dateModified: Date;
}

export async function fetchChannels(userID: string) {
  try {
    const userChannels = await Channel.find({ members: userID });
    return userChannels;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export async function fetchChannelByMembers(member1: string, member2: string) {
  noStore();
  try {
    const channel = await Channel.findOne({
      $and: [{ members: member1 }, { members: member2 }],
    });

    return channel;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function fetchUserChannels(userId?: string | null) {
  try {
    let channels = await Channel.find({ members: userId }).sort({
      dateModified: -1,
    });

    return channels;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Something went wrong");
    }
  }
}
