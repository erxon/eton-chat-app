"use client";

import { Channel } from "@/app/lib/channel/data";
import {
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { realtime } from "@/app/lib/utilities/ably-realtime";
import { fetchChannels } from "../fetch/channels";

export default function ChannelsListener({
  children,
  userId,
  setChannels,
}: {
  children: ReactNode;
  userId: string;
  setChannels: Dispatch<SetStateAction<Channel[]>>;
}) {
  const fetchData = useCallback(async () => {
    const result = await fetchChannels(userId);
    setChannels(result.data);
  }, [userId, setChannels]);

  useEffect(() => {
      const ablyChannel = realtime.channels.get(userId);
      ablyChannel.subscribe((message) => {
        if (message.name === "new-chat") {
          fetchData();
        }
      });
    }, [userId, fetchData]);

  return (
    <>
      <div>{children}</div>
    </>
  );
}
