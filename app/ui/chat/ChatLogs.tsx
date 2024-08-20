"use server";

import { getAllChats } from "@/app/lib/database/chat-db";
import clsx from "clsx";
import { auth } from "@/auth";
import { fetchUserByEmail } from "@/app/lib/data";
import Image from "next/image";

interface Chats {
  from: string;
  message: string;
  id: string;
}

export default async function ChatLogs() {
  const session = await auth();
  const email = session?.user?.email;
  const user = await fetchUserByEmail(email);
  const userID = user?.id;

  const allChats: Chats[] = await getAllChats();

  return (
    <div className="box-border p-3 mt-2 bg-neutral-50 rounded-lg h-[500px] overflow-y-scroll">
      {/*Chat logs*/}
      {allChats.map(({ message, from, id }: Chats) => {
        return (
          <div key={id.toString()} className="flex gap-3 mb-3">
            {from.toString() !== userID && (
              <div className="flex items-center">
                <Image
                  width={48}
                  height={48}
                  src={user?.image}
                  alt="user profile"
                />
              </div>
            )}
            <div className={clsx(from.toString() == userID && "ml-auto")}>
              <div
                className={clsx(
                  from.toString() === userID
                    ? "w-fit p-4 rounded-full bg-cyan-300 ml-auto"
                    : "w-fit p-4 bg-neutral-200 rounded-full"
                )}
              >
                {message.toString()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
