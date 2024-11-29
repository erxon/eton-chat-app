import { fetchRequestedBy } from "@/app/lib/channel/data";
import { fetchUserByEmail, fetchUserById } from "@/app/lib/user/data";
import Avatar from "@/app/ui/components/Avatar";
import CancelRequestBtn from "@/app/ui/components/contacts/CancelRequestBtn";
import Loading from "@/app/ui/components/Loading";
import { auth } from "@/auth";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default async function Pending() {
  const session = await auth();
  const user = await fetchUserByEmail(session?.user?.email);
  const channels = await fetchRequestedBy(user.id);
  const pendingChannels = channels.data.filter((channel : any) => {
    return channel.status === "pending";
  })

  return (
    <>
    <Link href="/welcome/contacts" className="font-bold flex gap-2 mb-5">
        <ArrowLeftIcon className="w-6 h-6" />
        <p>Contacts</p>
      </Link>
      <div className="grid grid-cols-3 gap-2">
        {pendingChannels.length > 0 ? pendingChannels.map((channel: any) => {
            return (
              <Suspense key={channel.id} fallback={<Loading />}>
                <Contact currentUser={user.id} userId={channel.requestedTo} />
              </Suspense>
            );
        }) :<p className="text-neutral-500">There are no pending requests</p>}
      </div>
    </>
  );
}

async function Contact({ currentUser, userId }: { currentUser: string; userId: string }) {
  const user = await fetchUserById(userId);
  return (
    <>
      <div className="p-3 bg-white shadow-md rounded-lg h-18">
        <div className="flex flex-col items-start h-[100%]">
          <div className="flex gap-2 mb-3 grow">
            <Avatar imageAddress={user.image} />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-neutral-600 text-sm">{user.email}</p>
              {user.createdAt && (
                <p className="text-neutral-600 text-sm">
                  Joined {new Date(user.createdAt).toDateString()}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <CancelRequestBtn currentUserID={currentUser} otherUserID={userId} />
          </div>
        </div>
      </div>
    </>
  );
}
