"use client";

import { acceptRequest } from "@/app/ui/components/utilties/contacts";
import { deleteChannel } from "@/app/lib/contact/actions";
import { deleteNotificationByRecepient} from "@/app/lib/notification/actions";

export default function Buttons({
  currentUser,
  userId,
}: {
  currentUser: string;
  userId: string;
}) {
  async function handleAccept() {
    try {
      await deleteNotificationByRecepient(currentUser);
      await acceptRequest(currentUser, userId);
    } catch (error) {
      console.log(error);
    }
  }
  
  async function handleDecline() {
    try {
      // await deleteChannel(currentUserID, otherUserID, query);
      await deleteNotificationByRecepient(currentUser);
      await deleteChannel(currentUser, userId);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex gap-1">
        <button
          onClick={handleAccept}
          className="bg-blue-500 p-1 rounded text-sm font-semibold text-white"
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          className="bg-neutral-300 p-1 rounded text-sm font-semibold"
        >
          Decline
        </button>
      </div>
    </>
  );
}
