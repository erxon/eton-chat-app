"use client";

import { ChatInterface, fetchChat } from "@/app/lib/chat/data";
import { useChannel, usePresence, usePresenceListener } from "ably/react";
import { useCallback, useEffect, useState } from "react";
import Logs from "./Logs";
import SendChat from "./SendChat";
import { PresenceMessage } from "ably";

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

  //Retrieve chats from the database
  const getChats = useCallback(async () => {
    const chats = await fetchChat(channelId, user);
    const parsedChats = chats ? JSON.parse(chats) : [];

    setMessages(parsedChats.reverse());
  }, [channelId, user]);

  /*
  Listen to the messages in the channel. Update the message array
  everytime a new message is received
  */
  const { channel } = useChannel(channelId, (message) => {
    if (message.name === "new-chat") {
      setMessages((prev) => {
        return [
          {
            from: message.clientId,
            message: message.data.text,
            dateCreated: new Date(),
          },
          ...prev,
        ];
      });
    }
  });

  //Enter the presence array
  const { updateStatus } = usePresence(channelId, "enter");

  //get the presence data
  const { presenceData } = usePresenceListener(channelId);

  useEffect(() => {
    getChats();
  }, [getChats]);

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
        presenceData={presenceData}
      />
    </>
  );
}
