"use client";

import { ChatInterface, fetchChat } from "@/app/lib/chat/data";
import { useChannel } from "ably/react";
import { useCallback, useEffect, useState } from "react";
import Logs from "./Logs";
import SendChat from "./SendChat";
import { useMessages } from "@ably/chat/react";

export default function ChatLogs({
  channelId,
  user,
  currentUserImage,
  userFromContactImage,
  contact,
  contactName,
}: {
  channelId: string;
  user: string;
  currentUserImage: string;
  userFromContactImage: string;
  contact: string;
  contactName: string;
}) {
  const [messages, setMessages] = useState<Array<ChatInterface>>([]);

  const getChats = useCallback(async () => {
    const chats = await fetchChat(channelId);
    const parsedChats = chats ? JSON.parse(chats) : [];

    setMessages([...parsedChats.reverse()]);
  }, [channelId]);

  useEffect(() => {
    getChats();
  }, [getChats]);
  
  useMessages({
    listener: (message) => {
      setMessages((prev) => {
        return [
          { message: message.message.text, from: message.message.clientId },
          ...prev,
        ];
      });
    },
  });

  return (
    <>
      <Logs
        chat={messages}
        userId={user}
        currentUserImage={currentUserImage}
        userFromContactImage={userFromContactImage}
      />
      <SendChat
        from={user.toString()}
        channelId={channelId}
        contact={contact}
        contactName={contactName}
      />
    </>
  );
}
