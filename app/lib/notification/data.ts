"use server";

import { getAll } from "../database/notification-db";

export async function fetchUserNotifications(userId: string) {
  try {
    const notifications = await getAll(userId);
    return { data: notifications, success: true };
  } catch (error) {
    return { data: [], success: false };
  }
}
