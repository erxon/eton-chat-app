import { getChat } from "../database/chat-db";

export async function fetchChat(chatId: string) {
  try {
    const chat = await getChat(chatId);
    return chat;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
