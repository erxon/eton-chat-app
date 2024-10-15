import { fetchContacts } from "@/app/lib/profile/data";
import ContactCardMessage from "./ContactCardMessage";
import Link from "next/link";

export default async function Contacts({
  email,
}: {
  email: string | null | undefined;
}) {
  const contacts = await fetchContacts(email);
  
  return (
    <>
      <div className="">
        {contacts &&
          contacts.map((contact : string) => {
            return (
              <Link
                key={contact.toString()}
                href={`/welcome/chat/${contact.toString()}`}
              >
                <ContactCardMessage id={contact.toString()} active={false} />
              </Link>
            );
          })}
      </div>
    </>
  );
}
