import User from "../models/User";
import Account from "../models/Account";
import dbConnect from "../db-connect";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchUserById(id: string) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error("Something went wrong fetching user");
  }
}

export async function fetchUserByEmail(email: string | undefined | null) {
  try {
    noStore();
    await dbConnect();
    const user = await User.findOne({ email: email });
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: email,
      name: user.name,
      image: user.image,
    };
  } catch (error) {
    return null;
  }
}

export async function fetchAccount(id: string) {
  try {
    noStore();
    await dbConnect();
    const account = await Account.findOne({ userId: id });
    return account;
  } catch (error) {
    return null;
  }
}

export async function fetchUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("No users");
  }
}

export async function fetchUser(term: string) {
  try {
    const foundUser = await User.find({ name: new RegExp(term, "i") });
    return foundUser;
  } catch (error) {
    throw new Error("User not found");
  }
}

export async function fetchUserProfile(id: string) {
  try {
    const profile = await User.findById(id);
    return profile;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error}`);
    }
  }
}
