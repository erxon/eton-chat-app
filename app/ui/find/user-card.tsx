"use client";

import Image from "next/image";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { createChannel } from "@/app/lib/contact/actions";

export default function UserCard({
  query,
  currentUser,
  userID,
  name,
  image,
  email,
}: {
  query: string;
  currentUser: string;
  userID: string;
  name: string;
  image: string;
  email: string;
}) {
  return (
    <div className="bg-neutral-50 p-3 mb-2 flex gap-4 rounded">
      <div>
        <Image
          width={1000}
          height={1000}
          className="rounded-full w-[48px] h-[48px]"
          src={image}
          alt="user profile image"
        />
      </div>
      <div className="text-left flex-grow">
        <p>{name}</p>
        <p className="text-neutral-500 text-sm">{email}</p>
      </div>
      <div className="flex items-center">
        <button
          className="mr-3"
          onClick={async () => {
            await createChannel(currentUser, userID, query);
          }}
        >
          <UserPlusIcon className="w-6 h-6 text-cyan-500" />
        </button>
        <Link href={`/welcome/profile/${userID}`}>
          <UserCircleIcon className="w-6 h-6 text-cyan-500" />
        </Link>
      </div>
    </div>
  );
}
