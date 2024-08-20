"use client";

import { createChannel } from "@/app/lib/contact/actions";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Loading from "../Loading";

export default function AddToContactBtn({
  currentUser,
  userID,
  query,
}: {
  currentUser: string;
  userID: string;
  query: string;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <div className="mr-2">
          <Loading />
        </div>
      ) : (
        <button
          onClick={async () => {
            setLoading(true);
            await createChannel(currentUser, userID, query);
          }}
          className="tooltip"
          data-tip="Add"
        >
          <UserPlusIcon className="w-6 h-6 mr-2 text-cyan-500" />
        </button>
      )}
    </>
  );
}
