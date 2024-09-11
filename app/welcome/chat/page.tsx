// For Refactor
import ContactCardMessage from "@/app/ui/components/ContactCardMessage";
import { Suspense, useState } from "react";
import ChatLogs from "@/app/ui/chat/ChatLogs";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addChat } from "@/app/lib/chat/actions";
import Contacts from "@/app/ui/components/Contacts";
import { auth } from "@/auth";

export default async function Page() {
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
          <div className="bg-cyan-500 text-white p-3 rounded-lg">
            <p className="font-semibold">John Doe</p>
            <p className="text-sm">Active</p>
          </div>
          {/* Chat Logs */}
          <Suspense fallback={<div>Loading...</div>}>
            <ChatLogs />
          </Suspense>
          <form action={addChat}>
            <div className="flex gap-1 items-center mt-5">
              <input
                className="p-3 rounded-full grow outline outline-1 outline-neutral-500 focus:outline-cyan-500"
                placeholder="Type your message here..."
                name="message"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-cyan-500 font-semibold text-sm text-white flex items-center gap-1"
              >
                Send
                <PaperAirplaneIcon className="w-4 h-4" />
              </button>
            </div>
          </form>
          {/* {sendMessageError && (
            <p className="text-red-400 mt-1">{sendMessageError}</p>
          )} */}
        </div>
      </div>
    </>
  );
}
