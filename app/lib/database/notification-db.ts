"use server";

import dbConnect from "../db-connect";
import Notification from "../models/Notification";

export interface Notification {
  from?: string;
  to?: string;
  message?: string;
  dateCreated?: Date;
  dateModified?: Date;
}

export async function getAll(to: string) {
  try {
    const notifications = await Notification.find({ to: to });
    return notifications;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function createData(notification: Notification) {
  try {
    await dbConnect();
    const newNotification = new Notification({
      from: notification.from,
      to: notification.to,
      message: notification.message,
      dateCreated: new Date(),
    });

    const result = await newNotification.save();
    
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function updateData() {}

export async function deleteData(id: string) {
  try {
    await Notification.findByIdAndDelete(id);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
