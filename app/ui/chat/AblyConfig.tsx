"use client";

import * as Ably from "ably";
import { ChatClient, RoomOptionsDefaults } from "@ably/chat";
import { ChatClientProvider, ChatRoomProvider } from "@ably/chat/react";
import ChatLogs from "./ChatLogs";

export default function AblyeConfig({
  chats,
  channelId,
  user,
  currentUserImage,
  userFromContactImage,
  contact,
  contactName,
}: {
  chats: string;
  channelId: string;
  user: string;
  currentUserImage: string;
  userFromContactImage: string;
  contact: string;
  contactName: string;
}) {
  const client = new Ably.Realtime({
    authUrl: "http://localhost:3000/api/chat",
  });

  const chatClient = new ChatClient(client);

  return (
    <ChatClientProvider client={chatClient}>
      <ChatRoomProvider id={channelId} options={RoomOptionsDefaults}>
        <ChatLogs
          channelId={channelId}
          user={user}
          currentUserImage={currentUserImage}
          userFromContactImage={userFromContactImage}
          contact={contact}
          contactName={contactName}
        />
      </ChatRoomProvider>
    </ChatClientProvider>
  );
}
