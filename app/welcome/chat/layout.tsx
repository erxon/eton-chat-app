// For Refactor
import ContactCardMessage from "@/app/ui/components/ContactCardMessage";
import { Suspense, useState } from "react";
import Contacts from "@/app/ui/components/Contacts";
import { auth } from "@/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  //Todo:
  //[done] Create a temporary data for chat logs
  //[done] Send message
  //[done] Fix Chat Log
  //[] Insert the message to Database
  //[] Fetch the messages
  //[] Add Loading

  const session = await auth();
  const email = session?.user?.email;

  return (
    <>
      <div className="h-full">
        <h2 className="font-semibold mb-3">Messages</h2>
        <div className="grid grid-cols-3 box-border chat-page">
          <div className="col-span-1">
            <div className="overflow-y-hidden bg-white shadow rounded-lg h-full">
              <Suspense fallback={<div>Loading...</div>}>
                <Contacts email={email} />
              </Suspense>
            </div>
          </div>
          <div className="col-span-2 mx-10 bg-white rounded-lg shadow">{children}</div>
        </div>
      </div>
    </>
  );
}
