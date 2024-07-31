import Image from "next/image";
import { fetchUserProfile } from "../lib/data";
import { UserPlusIcon } from "@heroicons/react/24/solid";

export default async function Profile({ id }: { id: string }) {
  const profile = await fetchUserProfile(id);

  function Info({ title, content }: { title: string; content: string }) {
    return (
      <div className="mb-3">
        <p className="text-sm font-semibold">{title}</p>
        <p>{content}</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-3/4 mx-auto">
        {/* Head Bar*/}
        <div className="shadow-md p-4 rounded-lg flex gap-3 items-center">
          <Image
            width={1000}
            height={1000}
            className="w-[60px] h-[60px] rounded-full"
            src={profile?.image}
            alt="Profile image"
          />
          <div className="flex-grow">
            <p className="font-semibold text-lg">{profile.name}</p>
            <div className="flex gap-2 items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-sm">Online</p>
            </div>
          </div>
          <div>
            <button>
              <UserPlusIcon className="w-6 h-6 text-cyan-500" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-8 gap-3 mt-10">
          <div className="col-span-3 p-3 bg-neutral-100 rounded-md">
            <div className="h-12"></div>
            <Info title="Birthday" content="Nov 3, 2000" />
            <Info
              title="Lives in"
              content="B4 L23 P2 Etherea Subd., Brgy. Kamatisan, San Antonio Laguna"
            />
            <Info title="Email" content={profile.email} />
            <Info title="Contact number" content="+63 980 0123 3210" />
          </div>
          <div className="col-span-5 p-2">
            <h2 className="h-12 font-semibold mb-3">Mutual contacts</h2>
            <div className="rounded transition hover:bg-cyan-200 w-fit p-3">
              <Image
                className="w-[48px] h-[48px] rounded-full mb-2"
                width={1000}
                height={1000}
                src="/eton.png"
                alt="mutual contact"
              />
              <p className="text-sm font-medium">Ericson</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
