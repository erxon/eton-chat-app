import { auth } from "@/auth";
import { fetchUserByEmail } from "@/app/lib/user/data";
import dynamic from "next/dynamic";
import DisplayContacts from "./DisplayContacts";


export default async function Contacts() {
  const session = await auth();
  const email = session?.user?.email;
  const user = await fetchUserByEmail(email);
  const userId = user?.id.toString();

  if (userId) {
    return <DisplayContacts userId={userId} />;
  }
}
