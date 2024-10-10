import Image from "next/image";
import clsx from "clsx";
import { fetchUserById } from "@/app/lib/user/data";
import Link from "next/link";
import Avatar from "./Avatar";
import CharacterAvatar from "./CharacterAvatar";

export default async function ContactCardMessage({
  id,
  active = false,
}: {
  id: string;
  active: boolean;
}) {
  const user = await fetchUserById(id);

  return (
      <div
        className={clsx(
          "p-3 rounded mb-3 flex cursor-pointer w-[75%]",
          active ? "bg-neutral-100" : "hover:bg-neutral-100"
        )}
      >
        <div className="mr-2 relative">
          {user.image ? (
            <Avatar imageAddress={user.image} />
          ) : (
            <CharacterAvatar name={user.name} />
          )}
          {/* Active Indicator */}
          <div className="absolute w-3 h-3 right-0 bottom-0 rounded-full bg-green-500"></div>
        </div>
        <div>
          {/* Contact's name */}
          <p className="font-semibold">{user?.name}</p>
          {/* Recent message sent */}
          <p className="text-neutral-600 text-sm">
            Lorem ipsum sit amet do siew...
          </p>
        </div>
      </div>
  );
}
