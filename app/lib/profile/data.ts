"use server";

import Profile from "../models/Profile";

export async function fetchContacts(userID: string) {
  try {
    const profile = await Profile.findOne({userId: userID});
    const contacts = profile?.contacts;

    return contacts;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
