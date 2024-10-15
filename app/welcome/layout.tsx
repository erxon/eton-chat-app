import React from "react";
import Navigation from "../ui/navigation";
import MobileNav from "../ui/components/MobileNav";
import TopNavigation from "../ui/navigation/top-navigation";
import { auth } from "@/auth";
import { fetchUserByEmail } from "../lib/user/data";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = await fetchUserByEmail(session?.user?.email);
  
  return (
    <section>
      {/* Header */}
      <TopNavigation avatar={user?.image} userId={user?.id} />
      {/* Side navigation */}
      <div className="px-12 py-5 screen-height bg-neutral-50">{children}</div>
    </section>
  );
}
