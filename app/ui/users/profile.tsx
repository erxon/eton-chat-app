import Image from "next/image";
import { fetchUserById } from "@/app/lib/user/data";
import { fetchProfile } from "@/app/lib/profile/data";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { auth } from "@/auth";
import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import NotFound from "../../welcome/profile/[id]/not-found";
import { PencilIcon } from "@heroicons/react/24/solid";

export default async function Profile({ id }: { id: string }) {
  const session = await auth();
  const user = await fetchUserById(id);
  const profile = await fetchProfile(user.email);

  if (!profile) {
    return NotFound();
  }

  interface About {
    title: string;
    content: string;
  }

  interface Contact {
    name: string;
    id: string;
  }

  function About({ title, content }: About) {
    return (
      <div className="mb-3">
        <p className="text-sm font-bold">{title}</p>
        {content ? (
          <p className="text-sm">{content}</p>
        ) : (
          <p className="text-sm text-neutral-500">No information provided</p>
        )}
      </div>
    );
  }

  function Contact({ name, id }: Contact) {
    return (
      <div className="rounded transition w-fit p-3 text-center outline outline-1 outline-neutral-300">
        <Image
          className="w-[48px] h-[48px] rounded-full mb-2 mx-auto"
          width={1000}
          height={1000}
          src="/eton.png"
          alt="mutual contact"
        />
        <p className="text-sm font-medium mb-2">{name}</p>
        <Link
          href={`/welcome/profile/${id}`}
          role="button"
          className="bg-neutral-200 text-sm px-2 py-1 rounded-lg flex gap-1 items-center mx-auto w-fit"
        >
          <UserIcon className="w-4 h-4" />
          Profile
        </Link>
      </div>
    );
  }
  console.log(profile.email)
  return (
    <>
      <div className="w-3/4 mx-auto">
        {/* Head Bar*/}
        <div className="p-4 rounded-lg flex gap-3 items-center">
          <Image
            width={1000}
            height={1000}
            className="w-[60px] h-[60px] rounded-full"
            src={user?.image}
            alt="Profile image"
          />
          <div className="flex-grow">
            <p className="font-semibold text-lg">{user.name}</p>
            <div className="flex gap-2 items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-sm">Online</p>
            </div>
          </div>
          {/* {session?.user?.email !== user?.email && ( */}
          <div>
            <button className="btn btn-sm btn-primary">
              <UserPlusIcon className="w-4 h-4 text-white" />
              Add
            </button>
          </div>
          {/* )} */}
          {session?.user?.email === user?.email && (
            <Link href={`/welcome/profile/edit`} role="button" className="btn btn-outline btn-sm">
              <PencilIcon className="w-4 h-4"/>Edit
            </Link>
          )}
        </div>
        <div className="grid grid-cols-8 gap-3 mt-10">
          <div className="col-span-3 p-3 bg-neutral-50 rounded-md">
            <About title="About" content={profile?.about} />
            <About title="Birthday" content={profile.birthday ? profile?.birthday.toDateString() : undefined} />
            <About title="Lives in" content={profile?.address} />
            <About title="Email" content={profile?.email} />
            <About title="Contact number" content={profile?.contactNumber} />
          </div>
          <div className="col-span-5 p-2">
            <h2 className="font-semibold mb-4">Contacts</h2>
            <Contact name="Ericson Castasus" id="66d57095caddb7cf4adf4f89" />
          </div>
        </div>
      </div>
    </>
  );
}
