import { fetchContacts } from "@/app/lib/profile/data";
import { fetchUserByEmail } from "@/app/lib/user/data";
import Avatar from "@/app/ui/components/Avatar";
import RemoveToContactBtn from "@/app/ui/components/contacts/RemoveToContactBtn";
import { auth } from "@/auth";
import { UserMinusIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default async function Contacts() {
  const session = await auth();
  const contacts = await fetchContacts(session?.user?.email);
  const user = await fetchUserByEmail(session?.user?.email);

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-2">
        {contacts.map((contact: any) => {
          return (
            <div
              key={contact.id}
              className="p-3 bg-white shadow-md rounded-lg h-18"
            >
              <div className="flex flex-col items-start h-[100%]">
                <div className="flex gap-2 mb-3 grow">
                  <Avatar imageAddress={contact.image} />
                  <div>
                    <p className="font-semibold">{contact.name}</p>
                    <p className="text-neutral-600 text-sm">{contact.email}</p>
                    {contact.createdAt && (
                      <p className="text-neutral-600 text-sm">
                        Joined {new Date(contact.createdAt).toDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <RemoveToContactBtn userID={user.id} contact={contact.id} />
                  <Link href={`/welcome/profile/${contact.id}`} className="text-sm outline-neutral-300 rounded p-1 bg-blue-500 hover:bg-blue-700">
                    <UserCircleIcon className="w-6 h-6 text-neutral-500 text-white" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
