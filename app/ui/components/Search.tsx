"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { revalidatePath } from "next/cache";

export default function Search() {
  const [term, setTerm] = useState<string>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const searchInput = useRef<HTMLInputElement>(null);

  function handleSearch(term: string) {
    setTerm(term);
  }

  function onSearch() {
    if (term) {
      params.set("query", term);
      replace(`${pathname}?${params.toString()}`);
    }
  }

  function clearInput() {
    if (params.get("query")) {
      searchInput!.current!.value = "";
      params.delete("query");

      replace(pathname);
    }
  }
  return (
    <div>
      <div>
        <h1 className="font-semibold mb-2 md:block hidden">Need Someone?</h1>
        <p className="font-semibold mb-2 text-2xl md:hidden block">
          Need Someone?
        </p>
        <p>Search here</p>
      </div>
      {/* Search form */}
      <div className="m-6">
        <div className="relative mb-4">
          <UserIcon className="w-6 h-6 absolute left-2 top-4 text-neutral-400" />
          <input
            className="p-4 pl-10 rounded-full outline-0 shadow-md transition w-full"
            placeholder="Type the name of the user"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            ref={searchInput}
            defaultValue={searchParams.get("query")?.toString()}
          />
          {!!searchParams.get("query") && (
            <button
              onClick={clearInput}
              className="absolute w-6 h-6 inset-y-4 right-3 transition rounded-full hover:bg-neutral-300"
            >
              <XMarkIcon />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="bg-cyan-500 transition hover:bg-cyan-600 p-2 px-4 rounded-full font-medium text-white shadow-md flex mx-auto w-fit items-center"
          onClick={onSearch}
        >
          <p className="mr-1">Find</p>
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
