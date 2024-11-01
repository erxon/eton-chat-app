"use client";

import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
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

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={channelId}>
        <ChatLogs
          channelId={channelId}
          user={user}
          currentUserImage={currentUserImage}
          userFromContactImage={userFromContactImage}
          contact={contact}
          contactName={contactName}
        />
      </ChannelProvider>
    </AblyProvider>
  );
}
