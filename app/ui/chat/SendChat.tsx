"use client";

import { sendChat } from "@/app/lib/chat/actions";
import { TypingEvent } from "@ably/chat";
import { useMessages, useTyping } from "@ably/chat/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";

export default function SendChat({
  from,
  channelId,
  contact,
  contactName,
}: {
  from: string;
  channelId: string;
  contact: string;
  contactName: string;
}) {
  const [message, setMessage] = useState<string>("");

  const { start, stop, currentlyTyping } = useTyping({
    listener: (typingEvent: TypingEvent) => {
      console.log("Typing event received: ", typingEvent);
    },
  });

  const { send } = useMessages();

  async function handleSend() {
    try {
      await sendChat(message, from, channelId, contact);

      send({ text: message });
      setMessage("");

      stop();
    } catch (error) {
      console.log(error);
    }
  }

  function handleStartTyping() {
    start();
  }

  return (
    <div className="px-8">
      <div className="h-6">
        {currentlyTyping.has(contact) && (
          <TypingState contactName={contactName} />
        )}
      </div>
      <div className="flex gap-2">
        <input
          name="message"
          type="text"
          placeholder="Type your message here..."
          className="p-3 rounded-full w-full outline outline-1 outline-neutral-500 text-sm"
          value={message}
          onClick={handleStartTyping}
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
