import { fetchChannelByMembers } from "@/app/lib/channel/data";
import SendChat from "./SendChat";
import Logs from "./Logs";
import { fetchUserById } from "@/app/lib/user/data";

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

  const chat = Array.isArray(channel?.chat) ? channel.chat : [] ;
  const currentUserImage = currentUser.image;
  const userFromContactImage = userFromContact.image;
  
  return (
    <div className="box-border my-2 rounded-lg h-[500px]">
      <div className="chat-log-container">
        <Logs
          chat={chat}
          userId={user}
          currentUserImage={currentUserImage}
          userFromContactImage={userFromContactImage}
        />
      </div>
      <SendChat from={user.toString()} channelId={channel.id.toString()} />
    </div>
  );
}
