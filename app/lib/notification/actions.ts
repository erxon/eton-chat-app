"use server";

import { createData, deleteData } from "../database/notification-db";
import Notification from "../models/Notification";

export async function createNewNotification(
  from: string,
  to: string,
  message: string
) {
  try {
    const result = await createData({ from: from, to: to, message: message });
    return JSON.stringify(result);
  } catch (error) {
    return JSON.stringify({});
  }
}

export async function deleteNotification(id: string) {
  try {
    //delete
    await deleteData(id);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function deleteNotificationByRecepient(userId: string) {
  try {
    //delete
    await Notification.findOneAndDelete({ to: userId });
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
