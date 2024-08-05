"use client";

import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { createChannel } from "@/app/lib/contact/actions";
import AddToContactBtn from "../components/contacts/AddToContactBtn";
import CancelRequestBtn from "../components/contacts/CancelRequestBtn";
import { useState } from "react";

export default function UserCard({
  query,
  currentUser,
  userID,
  name,
  image,
  email,
  userRequest,
  userReceivedRequest,
}: {
  query: string;
  currentUser: string;
  userID: string;
  name: string;
  image: string;
  email: string;
  userRequest: boolean;
  userReceivedRequest: boolean;
}) {
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
        {userReceivedRequest ? (
          <div className="flex items-center">
            <p className="text-neutral-400 mr-3 text-sm">Requested</p>
            <CancelRequestBtn
              currentUserID={currentUser}
              otherUserID={userID}
              query={query}
            />
          </div>
        ) : userRequest ? (
          <p>Accept Request</p>
        ) : (
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
