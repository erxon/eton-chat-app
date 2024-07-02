"use client";

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { signOutTrigger } from "../../lib/actions";
import { auth } from "@/auth";
import Link from "next/link";
import NavLink from "../components/NavLink";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { BellIcon } from "@heroicons/react/24/solid";
import React, { useRef, useState, useEffect, ReactEventHandler } from "react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";

export default function TopNavigation({ avatar }: { avatar: string }) {
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
          href="/contacts"
          icon={<UsersIcon className="w-4 h-4 md:w-6 md:h-6" />}
          name="Contacts"
        />
        <NavLink
          href="/search"
          icon={<MagnifyingGlassIcon className="w-4 h-4 md:w-6 md:h-6" />}
          name="Search"
        />
      </div>
      <div className="flex flex-row items-center gap-1 p-1.5 rounded bg-gray-200 text-sm cursor-pointer mr-2">
        <BellIcon className="w-4 h-4 text-gray-600" />
        <div className="bg-cyan-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
          4
        </div>
      </div>
      <div className="relative">
        <div
          className="cursor-pointer"
          onClick={() => {
            setShowPopup(!showPopup);
          }}
        >
          <Image
            className="rounded-full w-12 h-12"
            width={40}
            height={40}
            src={avatar}
            alt="your profile picture"
          />
        </div>
        {/*Popup */}
        {showPopup && (
          <div className="absolute bg-white p-2 right-0 shadow-md text-sm z-10">
            <Link
              href="/welcome/profile"
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
