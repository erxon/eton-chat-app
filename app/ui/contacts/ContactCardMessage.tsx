"use client";

import clsx from "clsx";
import Avatar from "../components/Avatar";
import CharacterAvatar from "../components/CharacterAvatar";
import { ChatInterface } from "@/app/lib/chat/data";
import { useState, useEffect, useMemo } from "react";
import { updateChat } from "@/app/lib/chat/actions";

export default function ContactCardMessage({
  currentChannelId,
  channelId,
  id,
  active = false,
  currentUser,
  chat,
}: {
  currentChannelId: string;
  channelId: string;
  id: string;
  active: boolean;
  currentUser: string;
  chat: ChatInterface[];
}) {
  const [user, setUser] = useState<any>(null);

  let latestChat = useMemo(() => {
    return chat.length > 0 ? chat[chat.length - 1] : {};
  }, [chat])

  const [isUnread, setIsUnread] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/users/${id}`);
      const result = await response.json();
      setUser(result.data);
    };

    if (latestChat) {
      setIsUnread(
        latestChat.state === "unread" &&
          latestChat?.to?.toString() === currentUser?.toString()
      );
    }

    if (currentChannelId === channelId){
      latestChat.state = "read";
      setIsUnread(false);
    }

    fetchData();
  }, [id, latestChat, currentUser, channelId, currentChannelId]);

  if (user) {
    return (
      <div
        className={clsx(
          "p-3 flex cursor-pointer m-3 rounded-lg items-center",
          active ? "bg-neutral-100" : "hover:bg-neutral-100"
        )}
      >
        <div className="mr-2 relative">
          {user.image ? (
            <Avatar imageAddress={user.image} />
          ) : (
            <CharacterAvatar name={user.name} />
          )}
          {/* Active Indicator */}
          <div className="absolute w-3 h-3 right-0 bottom-0 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1">
          {/* Contact's name */}
          <p className="font-semibold">{user?.name}</p>
          {/* Recent message sent */}
          <p
            className={clsx(
              isUnread
                ? "text-black font-semibold text-sm"
                : "text-sm text-neutral-500"
            )}
          >
            {latestChat && latestChat?.from?.toString() === currentUser
              ? `You: ${latestChat.message}`
              : latestChat.message}
          </p>
        </div>
        {isUnread && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
      </div>
    );
  }
}
