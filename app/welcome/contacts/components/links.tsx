import { fetchRequestedBy, fetchRequestedTo } from "@/app/lib/channel/data";
import Loading from "@/app/ui/components/Loading";
import Link from "next/link";
import { Suspense } from "react";
import { ReactNode } from "react";

export function UnconfirmedLink({
  linkStyle,
  userId,
}: {
  linkStyle: string;
  userId: string;
}) {
  return (
    <Link
      href="/welcome/contacts/pending"
      className={`${linkStyle} flex px-4`}
    >
      <p className="grow">Pending requests</p>
      <Suspense fallback={<Loading />}>
        <NumberOfUnconfirmedRequests userId={userId} />
      </Suspense>
    </Link>
  );
}

export function RequestsLink({ linkStyle, userId }: { linkStyle: string, userId: string }) {
  return (
    <Link
      href="/welcome/contacts/requests"
      className={`${linkStyle} flex px-4`}
    >
      <p className="grow">Unconfirmed requests</p>
      <Suspense fallback={<Loading />}>
        <NumberOfRequests userId={userId} />
      </Suspense>
    </Link>
  );
}

export async function NumberOfUnconfirmedRequests({
  userId,
}: {
  userId: string;
}) {
  const channels = await fetchRequestedBy(userId);

  if (channels.success) {
    const pending = channels.data.filter((channel: any) => {
      return channel.status === "pending";
    });

    return <p className="text-blue-500">{pending.length}</p>;
  }
  return <p className="text-blue-500">0</p>;
}

export async function NumberOfRequests({ userId }: { userId: string }) {
  const channels = await fetchRequestedTo(userId);

  if (channels.success) {
    const pending = channels.data.filter((channel: any) => {
      return channel.status === "pending";
    });
    return <p className="text-blue-500">{pending.length}</p>;
  }
  return <p className="text-blue-500">0</p>;
}
