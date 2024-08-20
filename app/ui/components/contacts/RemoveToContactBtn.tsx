"use client";

import { UserMinusIcon } from "@heroicons/react/24/outline";
import { removeFromContact } from "@/app/lib/profile/actions";
import { useRef, useState } from "react";

export default function RemoveToContactBtn({
  userID,
  contact,
  query,
}: {
  userID: string;
  contact: string;
  query: string;
}) {
  const deleteRequest = useRef<HTMLDialogElement>(null);
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <button
        className="tooltip"
        data-tip="Remove"
        onClick={() => deleteRequest?.current?.showModal()}
      >
        <UserMinusIcon className="w-6 h-6 mr-2 text-neutral-400" />
      </button>
      <dialog ref={deleteRequest} className="modal text-left">
        <div className="modal-box">
          <h3 className="text-lg">
            Are you sure you want to remove the user from your contacts?
          </h3>
          <div className="modal-action">
            <button
              className="btn"
              disabled={disabled}
              onClick={async () => {
                setDisabled(true);
                await removeFromContact(userID, contact, query);
              }}
            >
              Yes
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
