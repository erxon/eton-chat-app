"use client";

import { createChannel } from "@/app/lib/contact/actions";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Loading from "../Loading";
import { realtime } from "@/app/lib/utilities/ably-realtime";
import { string } from "zod";
import { createNewNotification } from "@/app/lib/notification/actions";

export default function AddToContactBtn({
  currentUserImage,
  currentUserName,
  currentUser,
  userID,
  query,
}: {
  currentUserImage: string;
  currentUserName: string;
  currentUser: string;
  userID: string;
  query: string;
}) {
  const [loading, setLoading] = useState(false);
  const channel = realtime.channels.get(`request-${userID}`);

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
            const response = await createNewNotification(
              currentUser,
              userID,
              "Requesting to be added in your contacts"
            );

            const result = JSON.parse(response);
            console.log(result)
            if (result) {
              channel.publish("request", {
                id: result._id,
                from: currentUser,
                message: "Requesting to be added in your contacts",
                dateCreated: new Date(),
              });
            }
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
