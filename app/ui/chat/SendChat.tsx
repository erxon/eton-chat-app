"use client";

import { sendChat } from "@/app/lib/chat/actions";
import { useChannel, usePresence } from "ably/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { PresenceMessage } from "ably";


export default function SendChat({
  from,
  channelId,
  contact,
  contactName,
  presenceData
}: {
  from: string;
  channelId: string;
  contact: string;
  contactName: string;
  presenceData: PresenceMessage[]
}) {
  const [message, setMessage] = useState<string>("");

  //send message to the channel
  const { publish } = useChannel(channelId);

  //is contact present in the channel?
  const isContactPresent = !!presenceData.find((member) => {
    return member.clientId === contact
  });

  //send message
  async function handleSend() {
    try {
      await sendChat(message, from, channelId, contact, isContactPresent);
      publish("new-chat", {text: message})

      setMessage("");

      stop();
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className="px-8">
      {/* <div className="h-6">
        <TypingState contactName={contactName} />
      </div> */}
      <div className="flex gap-2">
        <input
          name="message"
          type="text"
          placeholder="Type your message here..."
          className="p-3 rounded-full w-full outline outline-1 outline-neutral-500 text-sm"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={handleSend} className="">
          <PaperAirplaneIcon className="w-6 h-6 text-cyan-500" />
        </button>
      </div>
    </div>
  );
}

function TypingState({ contactName }: { contactName: string }) {
  return (
    <div className="flex items-center gap-1">
      <ChatBubbleLeftEllipsisIcon className="w-4 h-4 text-blue-500" />
      <p className="text-neutral-500 text-sm">{contactName} is typing...</p>
    </div>
  );
}
