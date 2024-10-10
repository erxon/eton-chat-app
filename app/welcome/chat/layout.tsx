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
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <h2 className="font-semibold mb-4">Messages</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <Contacts email={email} />
          </Suspense>
        </div>
        <div className="col-span-2 mx-10">
            {children}
        </div>
      </div>
    </>
  );
}
