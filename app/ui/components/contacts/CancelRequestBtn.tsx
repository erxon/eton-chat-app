"use client";

import { deleteChannel } from "@/app/lib/contact/actions";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";

export default function CancelRequestBtn({
  currentUserID,
  otherUserID,
  query,
}: {
  currentUserID: string;
  otherUserID: string;
  query: string;
}) {
  const cancelRequestConfirmation = useRef<HTMLDialogElement>(null);
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          cancelRequestConfirmation.current?.showModal();
        }}
        className="p-1 text-sm rounded font-regular transition bg-neutral-200 hover:bg-neutral-300 mr-2"
      >
        Cancel
      </button>
      <dialog ref={cancelRequestConfirmation} className="modal text-left">
        <div className="modal-box">
          <h3 className="text-lg">
            Are you sure you want to cancel your request?
          </h3>
          <div className="modal-action">
            <button
              className="btn"
              disabled={disabled}
              onClick={async () => {
                setDisabled(true);
                await deleteChannel(currentUserID, otherUserID, query);
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
