import { fetchChannelByMembers } from "@/app/lib/channel/data";
import SendChat from "./SendChat";
import Logs from "./Logs";

export default async function ChatLogs({
  contact,
  user,
}: {
  contact: string;
  user: string;
}) {
  //fetch the channel
  //map the chat
  //add a add-chat component

  const channel = await fetchChannelByMembers(contact, user);

  return (
    <div className="box-border p-3 mt-2 bg-neutral-50 rounded-lg h-[500px] overflow-y-scroll">
      {/* add chat */}
      <Logs chat={channel.chat} />
      <SendChat from={user.toString()} channelId={channel.id.toString()} />
    </div>
  );
}
