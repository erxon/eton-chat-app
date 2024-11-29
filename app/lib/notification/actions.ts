"use server";

import { createData, deleteData } from "../database/notification-db";

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
