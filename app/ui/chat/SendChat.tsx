"use client";

import { sendChat } from "@/app/lib/chat/actions";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SendChat({
  from,
  channelId,
}: {
  from: string;
  channelId: string;
}) {
  const [message, setMessage] = useState<string>("");

  async function handleSend() {
    try {
      await sendChat(message, from, channelId);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex gap-2 px-8">
      <input
        name="message"
        type="text"
        placeholder="Type your message here..."
        className="p-3 rounded-full w-full outline outline-1 outline-neutral-500 text-sm"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button
        onClick={handleSend}
        className=""
      >
        <PaperAirplaneIcon className="w-6 h-6 text-cyan-500" />
      </button>
    </div>
  );
}
