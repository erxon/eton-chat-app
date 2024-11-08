import React from "react";
import TopNavigation from "../ui/navigation/top-navigation";
import { auth } from "@/auth";
import { fetchUserByEmail } from "@/app/lib/user/data";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const email = session?.user?.email;
  const user = await fetchUserByEmail(email);
  
  return (
    <section>
      {/* Header */}
      <TopNavigation avatar={user?.image} userId={user?.id.toString()} />
      {/* Side navigation */}
      <div className="px-12 py-5 screen-height bg-neutral-50">{children}</div>
    </section>
  );
}
