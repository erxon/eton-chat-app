"use client";

import { sendChat } from "@/app/lib/chat/actions";
import { useChannel, usePresence } from "ably/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React, { ReactEventHandler, useEffect, useState } from "react";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { PresenceMessage, Channel, RealtimeChannel } from "ably";
import { realtime } from "@/app/lib/utilities/ably-realtime";

export default function SendChat({
  from,
  channelId,
  contact,
  contactName,
  presenceData,
}: {
  from: string;
  channelId: string;
  contact: string;
  contactName: string;
  presenceData: PresenceMessage[];
}) {
  const [message, setMessage] = useState<string>("");
  const [typing, setTyping] = useState<any>([]);

  const { publish } = useChannel(channelId);
  const contactChannel = realtime.channels.get(contact);

  //is contact present in the channel?
  const isContactPresent = !!presenceData.find((member) => {
    return member.clientId === contact;
  });

  function handleTyping(event: React.FormEvent<HTMLInputElement>) {
    publish("typing", { isTyping: true });

    setTimeout(() => {
      publish("typing", { isTyping: false });
    }, 5000);
  }

  //send message
  async function handleSend() {
    try {
      await sendChat(message, from, channelId, contact, isContactPresent);
      publish("new-chat", { text: message });
      contactChannel.publish("new-chat", {text: message})

      setMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="px-8">
      <div className="h-6">
        <TypingState
          contactName={contactName}
          contact={contact}
          channelId={channelId}
          typing={typing}
          setTyping={setTyping}
        />
      </div>
      <div className="flex gap-2">
        <input
          name="message"
          type="text"
          placeholder="Type your message here..."
          className="p-3 rounded-full w-full outline outline-1 outline-neutral-500 text-sm"
          value={message}
          onClick={handleTyping}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSend} className="">
          <PaperAirplaneIcon className="w-6 h-6 text-cyan-500" />
        </button>
      </div>
    </div>
  );
}

function TypingState({
  contactName,
  contact,
  channelId,
  typing,
  setTyping,
}: {
  contactName: string;
  contact: string;
  channelId: string;
  typing: any;
  setTyping: any;
}) {
  const { channel } = useChannel(channelId, (message) => {
    if (message.name === "typing") {
      setTyping((prev: any) => {
        const filteredArray = prev.filter((item: any) => {
          return item.clientId !== message.clientId;
        });
        return [message, ...filteredArray];
      });
    }
  });

  if (typing && typing.length > 0) {
    const contactTypingState = typing.find((item: any) => {
      return item.clientId === contact;
    });

    return (
      <>
        {contactTypingState && contactTypingState.data.isTyping && (
          <div className="flex items-center gap-1 text-blue-500">
            <span className="loading loading-dots loading-xs"></span>
            <div className="text-neutral-500 text-sm">
              {contactName} is typing...
            </div>
          </div>
        )}
      </>
    );
  }
}
