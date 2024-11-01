import { fetchChannelByMembers } from "@/app/lib/channel/data";
import { fetchUserById } from "@/app/lib/user/data";
import dynamic from "next/dynamic";



const AblyConfig = dynamic(() => import("./AblyConfig"), {
  ssr: false,
});

export default async function ChatLogs({
  contact,
  user,
}: {
  contact: string;
  user: string;
}) {
  

  const [channel, currentUser, userFromContact] = await Promise.all([
    fetchChannelByMembers(contact, user),
    fetchUserById(user),
    fetchUserById(contact),
  ]);

  const chat = Array.isArray(channel?.chat) ? channel.chat : [];
  const currentUserImage = currentUser.image;
  const userFromContactImage = userFromContact.image;
  const contactName = userFromContact.name;
  const chats = JSON.stringify(chat);

  return (
    <AblyConfig
      chats={chats}
      channelId={channel.id}
      user={user}
      currentUserImage={currentUserImage}
      userFromContactImage={userFromContactImage}
      contact={contact}
      contactName={contactName}
    />
  );
}
