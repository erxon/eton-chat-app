import Image from "next/image";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <main className="h-screen">
      <div className="h-screen flex justify-center items-center">
        <div className="w-3/4 lg:w-1/2">
          <div className="flex items-center gap-2 mb-10">
            <ChatBubbleLeftRightIcon className="w-16 h-16 text-blue-300" />{" "}
            <div>
              <h1 className="text-4xl md:text-5xl mb-1">Open Conversations</h1>
              <p className="ml-1">Connecting the world.</p>
            </div>
          </div>
          <div className="mb-4">
            <a
              role="button"
              className="w-10 bg-blue-500 text-white font-semibold p-2 rounded mr-1"
              href="/login"
            >
              Login
            </a>
            <a
              role="button"
              href="/signup"
              className="outline outline-blue-500 outline-1 p-2 rounded transition hover:bg-blue-500 hover:text-white font-semibold"
            >
              Sign up
            </a>
          </div>
          <div className="flex items-center gap-2 mb-10">
            <Image
              className="rounded-full"
              width={32}
              height={32}
              src="/eton.png"
              alt="logo"
            />
            <p className="font-medium text-sm">By Eton Codes</p>
          </div>
        </div>
      </div>
    </main>
  );
}
