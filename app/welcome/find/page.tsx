import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/outline";
import { findUser } from "@/app/lib/chat/actions";

export default function Page() {
  return (
    <>
      <div className="mx-auto w-1/2 text-center">
        <div>
          <h1 className="font-semibold mb-2">Need Someone?</h1>
          <p>Search here</p>
        </div>
        {/* Search form */}
        <div className="m-6">
          <form action={findUser}>
            <div className="relative mb-4">
              <UserIcon className="w-6 h-6 absolute left-2 top-4 text-neutral-400" />
              <input
                className="p-4 pl-10 rounded-full outline-0 shadow-md transition w-full"
                placeholder="Type the name of the user"
                name="user"
              />
            </div>
            <button type="submit" className="bg-cyan-500 transition hover:bg-cyan-600 p-2 px-4 rounded-full font-medium text-white shadow-md flex mx-auto w-fit items-center">
              <p className="mr-1">Find</p>
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
