import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function Page() {
  return (
    <>
      <div className="h-full flex items-center justify-center bg-neutral-50 rounded-lg">
        <div className="flex items-center gap-2">
          <UserCircleIcon className="w-6 h-6 text-neutral-500" />
          <p className="font-medium text-neutral-500">
            Select a contact to view chats
          </p>
        </div>
      </div>
    </>
  );
}
