import Image from "next/image";
import clsx from "clsx";
import { fetchUserById } from "@/app/lib/user/data";
import Link from "next/link";
import Avatar from "../components/Avatar";
import CharacterAvatar from "../components/CharacterAvatar";
import { fetchChannelByMembers } from "@/app/lib/channel/data";
import { ChatInterface } from "@/app/lib/chat/data";

export default async function ContactCardMessage({
  id,
  active = false,
  currentUser,
  chat,
}: {
  id: string;
  active: boolean;
  currentUser: string;
  chat: ChatInterface[];
}) {
  const user = await fetchUserById(id);
  let latestChat = chat.length > 0 ? chat[chat.length - 1] : {};
  let isUnread = latestChat.state === "unread" && latestChat?.to?.toString() === currentUser?.toString();

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
          {latestChat && latestChat?.to?.toString() === currentUser.toString()
            ? `You: ${latestChat.message}`
            : latestChat.message}
        </p>
      </div>
      {isUnread && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
    </div>
  );
}
