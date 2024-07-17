import { getAllChats } from "@/app/lib/chat/chat-db";
import { useRef, useEffect } from "react";
import clsx from "clsx";

export default async function ChatLogs() {
  const allChats = await getAllChats();
  const chatLog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatLog.current) {
      chatLog.current.scrollTop = chatLog.current.scrollHeight;
    }
  }, [allChats]);

  return (
    <div
      className="box-border p-3 mt-2 bg-neutral-50 rounded-lg h-[400px] overflow-y-scroll"
      ref={chatLog}
    >
      {/* Chat logs */}
      {allChats.map(
        ({
          message,
          from,
        }: {
          message: string;
          from: string;
        }) => {
          return (
            <div key={message} className="flex gap-3 mb-3">
              {from !== "You" && (
                <div className="flex items-center">
                  
                </div>
              )}
              <div className={clsx(from == "You" && "ml-auto")}>
                <p
                  className={clsx(
                    "text-sm text-neutral-700 mb-1",
                    from === "You" && "text-right"
                  )}
                >
                  {from}
                </p>
                <div
                  className={clsx(
                    from === "You"
                      ? "w-fit p-4 rounded-full bg-cyan-300"
                      : "w-fit p-4 bg-neutral-200 rounded-full"
                  )}
                >
                  {message}
                </div>
              </div>
              {from === "You" && (
                <div className="flex items-center">
                 
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}
