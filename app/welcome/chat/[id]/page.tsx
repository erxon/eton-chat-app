import { fetchUserByEmail } from "@/app/lib/user/data";
import Chat from "@/app/ui/chat/Chat";
import { auth } from "@/auth";
import { RealtimeChannel } from "ably";
import { Suspense } from "react";

export default async function Page({ params }: { params: { channel: RealtimeChannel, id: string } }) {
  const session = await auth();
  const email = session?.user?.email;
  const user = await fetchUserByEmail(email);
  const userId = user?.id;

  return (
    <>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Chat channelId={params.id} user={userId} />
        </Suspense>
      </div>
    </>
  );
}
