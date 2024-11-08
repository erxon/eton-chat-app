"use client";

import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import ChatLogs from "./ChatLogs";
import AblyConfig from "../components/utilties/AblyConfig";


export default function AblyConfigForChat({
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

  return (
    <AblyConfig>
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
    </AblyConfig>
  );
}
