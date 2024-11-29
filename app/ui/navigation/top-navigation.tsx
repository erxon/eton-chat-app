"use client";

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { signOutTrigger } from "../../lib/user/actions";
import Link from "next/link";
import NavLink from "../components/NavLink";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { BellIcon } from "@heroicons/react/24/solid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { realtime } from "@/app/lib/utilities/ably-realtime";
import Avatar from "../components/Avatar";
import { fetchUserById } from "@/app/lib/user/data";
import { acceptRequest } from "../components/utilties/contacts";
import { elapsedTime } from "../components/utilties/elapsed-time";
import { fetchUserNotifications } from "@/app/lib/notification/data";
import { deleteNotification } from "@/app/lib/notification/actions";
import { deleteChannel } from "@/app/lib/contact/actions";

interface Notifications {
  id?: string;
  from?: string;
  message?: string;
  dateCreated?: Date;
}

export default function TopNavigation({
  avatar,
  userId,
}: {
  avatar: string;
  userId: string;
}) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="h-18 flex items-center px-10 lg:shadow-sm">
      <div className="flex items-center">
        <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-700 mr-2" />
        <p className="font-bold text-xl hidden md:block grow">
          Conversationist
        </p>
      </div>
      <div className="grow flex justify-center m-3">
        <NavLink
          href="/welcome/chat"
          icon={
            <ChatBubbleBottomCenterTextIcon className="w-4 h-4 md:w-6 md:h-6" />
          }
          name="Chat"
        />
        <NavLink
          href="/welcome/contacts"
          icon={<UsersIcon className="w-4 h-4 md:w-6 md:h-6" />}
          name="Contacts"
        />
        <NavLink
          href="/welcome/find"
          icon={<MagnifyingGlassIcon className="w-4 h-4 md:w-6 md:h-6" />}
          name="Search"
        />
      </div>
      {/* Notification */}
      <Notifications userId={userId} />
      <div className="relative">
        <div
          className="cursor-pointer"
          onClick={() => {
            setShowPopup(!showPopup);
          }}
        >
          <Avatar imageAddress={avatar} />
        </div>
        {/*Popup */}
        {showPopup && (
          <div className="absolute bg-white p-2 right-0 shadow-md text-sm z-10">
            <Link
              href={`/welcome/profile/${userId}`}
              onClick={() => {
                setShowPopup(false);
              }}
              className="flex gap-1 mb-2"
            >
              <UserIcon className="w-4 h-4" /> Profile
            </Link>
            <form action={signOutTrigger}>
              <button className="flex gap-1">
                <ArrowRightStartOnRectangleIcon className="w-4 h-4" /> Signout
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function Notifications({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const channel = realtime.channels.get(`request-${userId}`);

  const fetchNotifications = useCallback(async () => {
    const fetchedNotifications = await fetchUserNotifications(userId);
    setNotifications(fetchedNotifications.data!);
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  channel.subscribe("request", (message) => {
    console.log(message.data);
    setNotifications([...notifications, message.data]);
  });

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        className="flex flex-row items-center gap-1 p-1.5 rounded bg-gray-200 text-sm cursor-pointer mr-2"
      >
        <BellIcon className="w-4 h-4 text-gray-600" />
        {notifications.length > 0 && (
          <div className="bg-cyan-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </div>
        )}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[300px] p-2 shadow"
      >
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            return (
              <Notification
                key={notification.id!}
                id={notification.id!}
                currentUser={userId}
                from={notification.from!}
                message={notification.message!}
                dateCreated={notification.dateCreated!}
              />
            );
          })
        ) : (
          <p className="text-neutral-500 p-3">No new notifications</p>
        )}
      </ul>
    </div>
  );
}

function Notification({
  id,
  currentUser,
  from,
  message,
  dateCreated,
}: {
  id: string;
  currentUser: string;
  from: string;
  message: string;
  dateCreated: Date;
}) {
  const [user, setUser] = useState<any>({});
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [isDeclined, setIsDeclined] = useState<boolean>(false);

  const fetchUser = useCallback(async () => {
    const response = await fetch(`/api/users/${from}`);
    const result = await response.json();

    setUser(result.data);
  }, [from]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleAccept = async () => {
    try {
      setIsAccepted(true);
      await acceptRequest(currentUser, from);
      await deleteNotification(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async () => {
    try {
      // await deleteChannel(currentUserID, otherUserID, query);
      setIsDeclined(true);
      await deleteNotification(id);
      await deleteChannel(currentUser, from);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={from} className="flex flex-col items-start border-b p-3">
      <div className="flex gap-3 mb-5">
        <Avatar imageAddress={user.image} />
        <div>
          <div className="flex">
            <p className="font-bold flex-1">{user.name}</p>
            <p>{elapsedTime(dateCreated)}</p>
          </div>
          <p>{message}</p>
        </div>
      </div>
      {!isAccepted && !isDeclined ? (
        <div className="flex">
          <button
            onClick={handleAccept}
            className="btn btn-sm mr-2 bg-cyan-500 hover:bg-cyan-600 text-white border-0"
          >
            Accept
          </button>
          <button onClick={handleDecline} className="btn btn-sm">
            Decline
          </button>
        </div>
      ) : !isDeclined ? (
        <p className="text-neutral-500 text-sm">Request accepted</p>
      ) : (
        <p className="text-neutral-500 text-sm">Request Declined</p>
      )}
    </div>
  );
}
