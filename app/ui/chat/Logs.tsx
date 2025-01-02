"use client";

import { UserIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";
import { ChatInterface } from "@/app/lib/chat/data";
import { useEffect, useRef } from "react";
import { elapsedTime } from "../components/utilties/elapsed-time";

export default function Logs({
  chat,
  userId,
  currentUserImage,
  userFromContactImage,
}: {
  chat: ChatInterface[];
  userId: string;
  currentUserImage: string;
  userFromContactImage: string;
}) {
  let messageEnd = useRef<HTMLDivElement | null>(null);

  return (
    <div className="box-border my-2 rounded-lg h-[500px]">
      <div className="chat-log-container" ref={messageEnd}>
        {chat.map((item: ChatInterface) => {
          const isFromCurrentUser = userId === item.from;

          return (
            <div
              key={item.id}
              className={clsx("flex flex-col ml-2 mr-2 my-3", {
                "items-end": isFromCurrentUser,
              })}
            >
              <div>
                <div className="flex gap-2">
                  {isFromCurrentUser && (
                    <p className="text-right w-full pr-3 text-sm text-neutral-500">
                      You
                    </p>
                  )}
                  <div className="w-[32px]"></div>
                </div>

                <div className="flex gap-2">
                  {!isFromCurrentUser && (
                    <Avatar address={userFromContactImage} />
                  )}
                  <div
                    className={clsx({ "justify-items-end": isFromCurrentUser })}
                  >
                    <div
                      className={clsx(
                        "p-3 rounded-full w-fit text-sm font-medium mb-1",
                        {
                          "bg-blue-500 text-white": isFromCurrentUser,
                          "bg-neutral-200": !isFromCurrentUser,
                        }
                      )}
                    >
                      <p>{item.message}</p>
                    </div>
                    <p
                      className={clsx("text-sm text-neutral-500", {
                        "text-right": isFromCurrentUser,
                        "text-left": !isFromCurrentUser,
                      })}
                    >
                      {elapsedTime(new Date(item.dateCreated!))}
                    </p>
                  </div>
                  {isFromCurrentUser && <Avatar address={currentUserImage} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Avatar({ address }: { address: string }) {
  return (
    <div>
      {address ? (
        <Image
          src={address}
          className="h-[32px] w-[32px] rounded-full"
          height={1000}
          width={1000}
          alt="user profile"
        />
      ) : (
        <div className="w-[32px] h-[32px] bg-neutral-300 rounded-full flex items-center justify-center">
          <div className="w-6 h-6">
            <UserIcon className="text-neutral-500" />
          </div>
        </div>
      )}
    </div>
  );
}
