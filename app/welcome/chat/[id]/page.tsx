import { fetchUserByEmail } from "@/app/lib/user/data";
import ChatLogs from "@/app/ui/chat/ChatLogs";
import { auth } from "@/auth";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
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
      {userId && (
        <Suspense fallback={<div>Loading...</div>}>
          <ChatLogs contact={params.id} user={userId} />
        </Suspense>
      )}
    </>
  );
}
