import { createChannel } from "@/app/lib/contact/actions";
import { UserPlusIcon } from "@heroicons/react/24/outline";

export default function AddToContactBtn({
  currentUser,
  userID,
  query,
}: {
  currentUser: string;
  userID: string;
  query: string;
}) {
  return (
    <div className="tooltip mr-3" data-tip="Add to Contacts">
      <button
        onClick={async () => {
          await createChannel(currentUser, userID, query);
        }}
      >
        <UserPlusIcon className="w-6 h-6 text-cyan-500" />
      </button>
    </div>
  );
}
