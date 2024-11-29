import { ReactNode } from "react";
import { UnconfirmedLink, RequestsLink } from "./components/links";
import Search from "./components/search";
import { auth } from "@/auth";
import { fetchUserByEmail } from "@/app/lib/user/data";

export default async function Layout({ children }: { children: ReactNode }) {
  const linkStyle =
    "p-2 rounded-lg transition hover:bg-neutral-200 font-medium outline outline-1 outline-neutral-200";
  const session = await auth();
  const user = await fetchUserByEmail(session?.user?.email!);


  return (
    <>
      <div>
        <h2 className="font-medium mb-10">Contacts</h2>
        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-1 flex flex-col gap-4">
            <Search />
            <UnconfirmedLink linkStyle={linkStyle} userId={user?.id!} />
            <RequestsLink linkStyle={linkStyle} userId={user?.id!} />
          </div>
          <div className="col-span-2">{children}</div>
        </div>
      </div>
    </>
  );
}
