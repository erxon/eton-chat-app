'use client';

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";


export default function NavLink({
  href,
  name,
  icon
}: {
  href: string;
  name: string;
  icon: ReactNode;
}) {

  const pathname = usePathname();

  return (
    <Link className={
      clsx(
        "flex flex-col items-center text-sm p-3 w-16 m-1 rounded transition hover:bg-blue-50",
        pathname === href && "bg-blue-50"
      )
      } href={href}>
      {icon}
      {name}
    </Link>
  );
}
