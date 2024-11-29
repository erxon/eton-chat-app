import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search() {
  return (
    <div>
      <label className="input input-bordered input-sm flex items-center gap-2">
        <input type="text" className="grow" placeholder="Search" />
        <MagnifyingGlassIcon className="w-4 h-4" />
      </label>
    </div>
  );
}
