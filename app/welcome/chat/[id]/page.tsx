import { fetchUserByEmail } from "@/app/lib/user/data";
import Chat from "@/app/ui/chat/Chat";
import { auth } from "@/auth";
import { RealtimeChannel } from "ably";
import { Suspense } from "react";

export const fetchCache = 'force-no-store';


export default async function Page({ params }: { params: { channel: RealtimeChannel, id: string } }) {
  //Fetch the channel by members
  //Display the chats
  //Adding new chat
  //Real-time update of the chat logs
  //Show the user is typing

  

  const session = await auth();
  const email = session?.user?.email;
  const user = await fetchUserByEmail(email);
  const userId = user?.id;

  return (
    <>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Chat contact={params.id} user={userId} />
        </Suspense>
      </div>
    </>
  );
}
