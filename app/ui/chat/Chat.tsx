import {
  fetchChannelById,
  fetchChannelByMembers,
} from "@/app/lib/channel/data";
import { fetchUserById } from "@/app/lib/user/data";
import dynamic from "next/dynamic";

const AblyConfigForChat = dynamic(() => import("./AblyConfigForChat"), {
  ssr: false,
});

export default async function ChatLogs({
  channelId,
  user,
}: {
  channelId: string;
  user: string;
}) {
  const channel = await fetchChannelById(channelId);
  const currentUser = await fetchUserById(user);
  const contactId = channel.members.filter((member: string) => {
    return member.toString() !== currentUser.id.toString();
  });
  const userFromContact = await fetchUserById(contactId);

  const chat = Array.isArray(channel?.chat) ? channel.chat : [];
  const currentUserImage = currentUser.image;
  const userFromContactImage = userFromContact.image;
  const contactName = userFromContact.name;
  const chats = JSON.stringify(chat);

  return (
    <AblyConfigForChat
      chats={chats}
      channelId={channel.id}
      user={user}
      currentUserImage={currentUserImage}
      userFromContactImage={userFromContactImage}
      contact={contactId[0]}
      contactName={contactName}
    />
  );
}
