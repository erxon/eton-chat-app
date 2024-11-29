import Image from "next/image";
import { fetchUserById } from "@/app/lib/user/data";
import { fetchProfile } from "@/app/lib/profile/data";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { auth } from "@/auth";
import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import NotFound from "../../welcome/profile/[id]/not-found";
import { PencilIcon } from "@heroicons/react/24/solid";
import Avatar from "../components/Avatar";
import { ReactNode } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { CakeIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { PhoneIcon } from "@heroicons/react/24/outline";

export default async function Profile({ id }: { id: string }) {
  const session = await auth();
  const user = await fetchUserById(id);
  const profile = await fetchProfile(user.email);

  if (!profile) {
    return NotFound();
  }

  interface About {
    icon?: ReactNode;
    title: string;
    content: string;
  }

  function About({ title, content, icon }: About) {
    return (
      <div className="mb-3 outline outline-1 outline-neutral-300 rounded-lg p-3 ">
        <div className="flex gap-1 items-center mb-2">
          {icon && icon}
          <p className="text-sm font-bold">{title}</p>
        </div>
        {content ? (
          <p className="text-sm">{content}</p>
        ) : (
          <p className="text-sm text-neutral-500">No information provided</p>
        )}
      </div>
    );
  }

  async function Contact({ id }: { id: string }) {
    const user = await fetchUserById(id);

    return (
      <div className="text-center flex flex-col items-center">
        <Avatar imageAddress={user.image} />
        <p className="text-sm mt-2">{user.name.split(" ")[0]}</p>
      </div>
    );
  }

  return (
    <>
      <div className="md:w-2/4 mx-auto m-3">
        {/* Head Bar*/}
        <div className="p-16 bg-white shadow-lg rounded-lg">
          <div className="rounded-lg mb-7 mx-auto w-[300px] text-center">
            <div className="mb-3">
              {user.image ? (
                <Image
                  src={user.image}
                  width={1000}
                  height={1000}
                  alt="profile image"
                  className="mx-auto rounded-full w-[120px] h-[120px] object-cover"
                />
              ) : (
                <div className="rounded-full w-[120px] h-[120px] flex items-center justify-center bg-neutral-300 mx-auto">
                  <UserIcon className="w-[52px] h-[52px] text-neutral-500" />
                </div>
              )}
            </div>

            <h1 className="font-bold mb-3">{user.name}</h1>

            {session?.user?.email === user?.email && (
              <Link
                href={`/welcome/profile/edit`}
                role="button"
                className="btn btn-outline btn-sm"
              >
                <PencilIcon className="w-4 h-4" />
                Edit
              </Link>
            )}
          </div>
          <div className="mb-10">
            <p className="font-semibold mb-2">Contacts</p>
            <div className="flex gap-2 items-center">
              {profile.contacts.map((contact: any, index: number) => {
                if (index < 5) {
                  return <Contact key={contact} id={contact} />;
                }
              })}
              {profile.contacts.length > 5 && (
                <p className="font-semibold text-sm text-neutral-500">
                  +{profile.contacts.length - 5} others
                </p>
              )}
            </div>
          </div>
          <div className="rounded-md">
            <About
              icon={
                <QuestionMarkCircleIcon className="w-4 h-4 text-neutral-500" />
              }
              title="About"
              content={profile?.about}
            />
            <About
              icon={<MapPinIcon className="w-4 h-4 text-neutral-500" />}
              title="Lives in"
              content={profile?.address}
            />
            <div className="grid lg:grid-cols-3 lg:gap-2">
              <About
                icon={<CakeIcon className="w-4 h-4 text-neutral-500" />}
                title="Birthday"
                content={
                  profile.birthday
                    ? profile?.birthday.toDateString()
                    : undefined
                }
              />

              <About
                icon={<EnvelopeIcon className="w-4 h-4 text-neutral-500" />}
                title="Email"
                content={profile?.email}
              />
              <About
                icon={<PhoneIcon className="w-4 h-4 text-neutral-500" />}
                title="Contact number"
                content={profile?.contactNumber}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
