"use client";

import { deleteChannel } from "@/app/lib/contact/actions";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import React, { useRef } from "react";

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

  return (
    <>
      <div
        className="tooltip mr-3"
        data-tip="Cancel request"
        onClick={() => {
          cancelRequestConfirmation.current?.showModal();
        }}
      >
        <button>
          <UserMinusIcon className="w-6 h-6 text-cyan-500" />
        </button>
      </div>
      <dialog ref={cancelRequestConfirmation} className="modal text-left">
        <div className="modal-box">
          <h3 className="text-lg">
            Are you sure you want to cancel your request?
          </h3>
          <div className="modal-action">
            <button
              className="btn"
              onClick={async () => {
                await deleteChannel(`${currentUserID}-${otherUserID}`, query);
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
