import { fetchContacts } from "@/app/lib/profile/data";
import ContactCardMessage from "./ContactCardMessage";
import Link from "next/link";
import { fetchUserByEmail } from "@/app/lib/user/data";
import { Channel, fetchUserChannels } from "@/app/lib/channel/data";

export default async function Contacts({
  email,
}: {
  email: string | null | undefined;
}) {
  const currentUser = await fetchUserByEmail(email);
  const channels = await fetchUserChannels(currentUser?.id);
  
  
  return (
    <>
      <div>
        {channels &&
          channels.map((channel: Channel) => {
            const contact =
              channel.members[0].toString() === currentUser?.id
                ? channel.members[1]
                : channel.members[0];
            
            return (
              <Link key={channel.id} href={`/welcome/chat/${contact}`}>
                <ContactCardMessage
                  currentUser={currentUser?.id}
                  chat={channel.chat}
                  id={contact}
                  active={false}
                />
              </Link>
            );
          })}
      </div>
    </>
  );
}
