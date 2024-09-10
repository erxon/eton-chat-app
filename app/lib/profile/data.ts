"use server";

import Profile from "../models/Profile";

export async function fetchContacts(userID: string) {
  try {
    const profile = await Profile.findOne({ userId: userID });
    const contacts = profile?.contacts;

    return contacts;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function fetchProfile(email: string | null | undefined) {
  try {
    const profile = await Profile.findOne({ email: email });
    return profile;
  } catch (error) {
    throw new Error("Something went wrong fetching profile");
  }
}
