"use client";

import Image from "next/image";
import ContactCardMessage from "@/app/ui/components/ContactCardMessage";
import clsx from "clsx";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { FormEventHandler, ReactEventHandler, useState } from "react";

export default function Page() {
  //Todo:
  //Create a temporary data for chat logs
  //Send message
  const [typedMessage, setTypedMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "John Doe",
      avatar: "/other-user.png",
      message: "How are you",
    },
    {
      from: "You",
      avatar: "/eton.png",
      message: "I'm fine, thank you. How about you?",
    },
    {
      from: "John Doe",
      avatar: "/other-user.png",
      message: "I'm good too",
    },
  ]);

  function handleSendMessage() {
    setMessages([
      ...messages,
      {
        from: "You",
        avatar: "/eton.png",
        message: typedMessage,
      },
    ]);
    setTypedMessage("");
  }

  return (
    <>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <h2 className="font-semibold mb-4">Messages</h2>
          {/* Contact card active */}
          <ContactCardMessage active={true} />
          {/* Contact card inactive */}
          <ContactCardMessage active={false} />
        </div>
        <div className="col-span-2 mx-10">
          <div className="bg-cyan-500 text-white p-3 rounded-lg">
            <p className="font-semibold">John Doe</p>
            <p className="text-sm">Active</p>
          </div>
          <div className="box-border p-3 mt-2 bg-neutral-50 rounded-lg h-[400px] overflow-y-scroll">
            {/* Chat logs */}
            {messages.map(
              ({
                message,
                from,
                avatar,
              }: {
                message: string;
                from: string;
                avatar: string;
              }) => {
                return (
                  <div key={message} className="flex gap-3">
                    {from !== "You" && (
                      <div className="flex items-center">
                        <Image
                          width={500}
                          height={500}
                          src={avatar}
                          alt="avatar"
                          className="rounded-full w-12 h-12 object-cover"
                        />
                      </div>
                    )}
                    <div className={clsx(from == "You" && "ml-auto")}>
                      <p
                        className={clsx(
                          "text-sm text-neutral-700 mb-1",
                          from === "You" && "text-right"
                        )}
                      >
                        {from}
                      </p>
                      <div
                        className={clsx(
                          from === "You"
                            ? "w-fit p-4 rounded-full bg-cyan-300"
                            : "w-fit p-4 bg-neutral-200 rounded-full"
                        )}
                      >
                        {message}
                      </div>
                    </div>
                    {from === "You" && (
                      <div className="flex items-center">
                        <Image
                          width={500}
                          height={500}
                          src={avatar}
                          alt="avatar"
                          className="rounded-full w-12 h-12 object-cover"
                        />
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
          <div className="flex gap-1 items-center mt-5">
            <input
              className="p-3 rounded-full grow outline outline-1 outline-neutral-500 focus:outline-cyan-500"
              placeholder="Type your message here..."
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="p-2 rounded-full bg-cyan-500 font-semibold text-sm text-white flex items-center gap-1"
            >
              Send
              <PaperAirplaneIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
