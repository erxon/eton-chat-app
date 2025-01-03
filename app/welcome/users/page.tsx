import Users from "@/app/ui/users/users";
import { Suspense } from "react";
import Search from "@/app/ui/find/search";

export default async function Page({searchParams} : {
  searchParams?: {
    query?: string;
  }
}) {
  const query = searchParams?.query || '';

  return (
    <main className="p-3">
      <h1 className="mb-3">Users</h1>
      <Search />
      <Suspense fallback={<div>Loading...</div>}>
        <Users query={query} />
      </Suspense>
    </main>
  );
}
