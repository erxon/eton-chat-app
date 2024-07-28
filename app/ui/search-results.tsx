import { findUser } from "../lib/chat/actions";
import Image from "next/image";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface User {
  name: string;
  id: string;
  email: string;
  image: string;
}

export default async function Results({ query }: { query: string }) {
  const foundUsers = await findUser(query);

  return (
    <div className="md:w-3/4 w-full mx-auto">
      {foundUsers && foundUsers?.length === 0 ? (
        <p className="text-left text-neutral-500 mb-3">User not found</p>
      ) : (
        <p className="text-left text-neutral-500 mb-3">Results</p>
      )}
      {foundUsers?.map((user: User) => {
        return (
          <div
            key={user.id}
            className="bg-neutral-50 p-3 mb-2 flex gap-4 rounded"
          >
            <div>
              <Image
                width={1000}
                height={1000}
                className="rounded-full w-[48px] h-[48px]"
                src={user.image}
                alt="user profile image"
              />
            </div>
            <div className="text-left flex-grow">
              <p>{user.name}</p>
              <p className="text-neutral-500 text-sm">{user.email}</p>
            </div>
            <div className="flex items-center">
              <button className="mr-3">
                <UserPlusIcon className="w-6 h-6 text-cyan-500" />
              </button>
              <Link href={`/welcome/profile/${user.id}`}>
                <UserCircleIcon className="w-6 h-6 text-cyan-500" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
