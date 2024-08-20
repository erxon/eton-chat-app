import Search from "@/app/ui/components/Search";
import Results from "@/app/ui/search-results";
import { Suspense } from "react";
import Loading from "@/app/ui/components/Loading";

export default function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";
  return (
    <>
      <div className="mx-auto lg:w-1/2 w-full text-center">
        <Search />
        {query !== "" && (
          <Suspense
            fallback={
              <div className="flex gap-2 text-center">
                <p>Searching</p>
                <Loading />
              </div>
            }
          >
            <Results query={query} />
          </Suspense>
        )}
      </div>
    </>
  );
}
