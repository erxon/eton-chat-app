"use client";

import clsx from "clsx";
import Avatar from "../components/Avatar";
import CharacterAvatar from "../components/CharacterAvatar";
import { ChatInterface } from "@/app/lib/chat/data";
import { useState, useEffect, useMemo } from "react";
import { updateChat } from "@/app/lib/chat/actions";
import { useConnectionStateListener } from "ably/react";
import { realtime } from "@/app/lib/utilities/ably-realtime";
import { RealtimeChannel } from "ably";

export default function ContactCardMessage({
  currentChannelId,
  channelId,
  id,
  active = false,
  currentUser,
  chat,
  contactIsActive,
}: {
  currentChannelId: string;
  channelId: string;
  id: string;
  active: boolean;
  currentUser: string;
  chat: ChatInterface[];
  contactIsActive: boolean;
}) {
  const [user, setUser] = useState<any>(null);

  let latestChat = useMemo(() => {
    return chat.length > 0 ? chat[chat.length - 1] : {};
  }, [chat]);

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

    if (currentChannelId === channelId) {
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
          {contactIsActive ? (
            <div className="absolute w-3 h-3 right-0 bottom-0 rounded-full bg-green-500"></div>
          ) : (
            <div className="absolute w-3 h-3 right-0 bottom-0 rounded-full bg-neutral-300"></div>
          )}
        </div>
        <div className="flex-1">
          {/* Contact's name */}
          <p className="font-semibold">{user?.name}</p>
          {/* Recent message sent */}
          <div
            className={clsx(
              "flex items-center",
              isUnread
                ? "text-black font-semibold text-sm"
                : "text-sm text-neutral-500"
            )}
          >
            <p className="flex-1">
              {latestChat && latestChat?.from?.toString() === currentUser
                ? `You: ${truncateChat(latestChat.message!)}`
                : `${truncateChat(latestChat.message!)}`}
            </p>
            <p>
              {latestChat && latestChat?.dateCreated && (
                elapsedTime(latestChat.dateCreated)
              )}
            </p>
          </div>
        </div>
        {isUnread && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
      </div>
    );
  }
}

const truncateChat = (chat: String) => {
  if (chat.length > 20) {
    return `${chat.substring(0, 20)}...`
  } else {
    return chat;
  }
}

const elapsedTime = (dateCreated: Date) => {
  let currentDate = new Date();
  let latestChatDate = new Date(dateCreated);

  let elapsedTimeInMilisec = currentDate.getMilliseconds() - latestChatDate.getMilliseconds();
  let finalTimeString = "";

  if (elapsedTimeInMilisec >= 86400000) {
    finalTimeString = `${Math.round(elapsedTimeInMilisec / 86400000)} days ago`;
  }

  if (elapsedTimeInMilisec < 86400000 && elapsedTimeInMilisec >= 3600000) {
    finalTimeString = `${Math.round(elapsedTimeInMilisec / 3600000)} hours ago`;
  }

  if (elapsedTimeInMilisec < 3600000 && elapsedTimeInMilisec >= 60000) {
    finalTimeString = `${Math.round(elapsedTimeInMilisec / 60000)} mins ago`;
  }

  if (elapsedTimeInMilisec < 60000) {
    finalTimeString = "New";
  }

  return finalTimeString;
};
