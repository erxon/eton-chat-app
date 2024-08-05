import dbConnect from "../db-connect";
import Channel from "../models/Channel";

export interface Channel {
  name: string;
  members: string[];
  requestedBy: string;
  requestedTo: string;
  userId: string;
  contact: string;
  status: string;
  chat: string[];
  dateCreated: Date;
  dateModified: Date;
}

export async function fetchChannels(userID: string) {
  try {
    const userChannels = await Channel.find({ members: userID});
    return userChannels;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
