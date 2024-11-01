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
  const latestChat = chat[chat.length - 1];

  return (
    <div
      className={clsx(
        "p-3 flex cursor-pointer m-3 rounded-lg",
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
      <div>
        {/* Contact's name */}
        <p className="font-semibold">{user?.name}</p>
        {/* Recent message sent */}
        <p className="text-neutral-600 text-sm">
          {chat.length > 0
            ? latestChat?.from?.toString() === currentUser.toString()
              ? `You: ${latestChat.message}`
              : latestChat.message
            : "New chat"}
        </p>
      </div>
    </div>
  );
}
