import Link from "next/link";
import { ReactNode } from "react";


export default function NavLink({
  href,
  name,
  icon
}: {
  href: string;
  name: string;
  icon: ReactNode
}) {
  return (
    <Link className="flex flex-col items-center text-sm p-3 w-16 m-1 rounded transition hover:bg-blue-50" href={href}>
      {icon}
      {name}
    </Link>
  );
}
