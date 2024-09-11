import { fetchContacts } from "@/app/lib/profile/data";
import ContactCardMessage from "./ContactCardMessage";

export default async function Contacts({ email }: { email: string | null | undefined }) {
  const contacts = await fetchContacts(email);
  return (
    <>
      {contacts &&
        contacts.map((contact: string) => {
          return (
            <ContactCardMessage key={contact.toString()} id={contact.toString()} active={false} />
          );
        })}
    </>
  );
}
