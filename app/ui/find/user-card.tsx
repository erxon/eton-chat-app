"use client";

import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import AddToContactBtn from "../components/contacts/AddToContactBtn";
import CancelRequestBtn from "../components/contacts/CancelRequestBtn";
import { activateChannel } from "@/app/lib/channel/actions";
import { contactRequestAccepted } from "@/app/lib/profile/actions";
import RemoveToContactBtn from "../components/contacts/RemoveToContactBtn";
import { useState } from "react";
import Loading from "../components/Loading";

export default function UserCard({
  query,
  currentUser,
  userID,
  name,
  image,
  email,
  userRequest,
  userReceivedRequest,
  isContact,
}: {
  query: string;
  currentUser: string;
  userID: string;
  name: string;
  image: string;
  email: string;
  userRequest: boolean;
  userReceivedRequest: boolean;
  isContact: boolean;
}) {
  const [loading, setLoading] = useState(false);
  //Accept add-to-contact request
  async function handleAccept() {
    const currentLoggedInUser = currentUser;
    const userToAccept = userID;

    setLoading(true);
    try {
      // activate the channel
      await activateChannel(`${userToAccept}-${currentLoggedInUser}`);
      // accept contact request
      await contactRequestAccepted(userToAccept, currentLoggedInUser, query);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  return (
    <div className="bg-neutral-50 p-3 mb-2 flex gap-4 rounded">
      <div>
        <Image
          width={1000}
          height={1000}
          className="rounded-full w-[48px] h-[48px]"
          src={image}
          alt="user profile image"
        />
      </div>
      <div className="text-left flex-grow">
        <p>{name}</p>
        <p className="text-neutral-500 text-sm">{email}</p>
      </div>
      <div className="flex items-center">
        {userReceivedRequest && (
          <div className="flex items-center">
            <p className="text-neutral-400 mr-3 text-sm">Requested</p>
            <CancelRequestBtn
              currentUserID={currentUser}
              otherUserID={userID}
              query={query}
            />
          </div>
        )}
        {userRequest &&
          (loading ? (
            <div className="mr-2">
              <Loading />
            </div>
          ) : (
            <button
              onClick={handleAccept}
              className="font-medium text-sm bg-cyan-400 rounded p-1 mr-2"
            >
              Accept
            </button>
          ))}
        {isContact && (
          <RemoveToContactBtn
            userID={currentUser}
            contact={userID}
            query={query}
          />
        )}
        {!userReceivedRequest && !userRequest && !isContact && (
          <AddToContactBtn
            currentUser={currentUser}
            userID={userID}
            query={query}
          />
        )}

        <div className="tooltip" data-tip="Profile">
          <Link href={`/welcome/profile/${userID}`}>
            <UserCircleIcon className="w-6 h-6 text-cyan-500" />
          </Link>
        </div>
      </div>
    </div>
  );
}
