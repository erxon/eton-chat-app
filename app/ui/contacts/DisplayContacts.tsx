"use client";

import { useState, useEffect, useCallback } from "react";
import ContactCardMessage from "./ContactCardMessage";
import Link from "next/link";
import { Channel, fetchUserChannels } from "@/app/lib/channel/data";
import ChannelsListener from "./ChannelsListener";
import { fetchChannels } from "../fetch/channels";

export default function DisplayContacts({ userId }: { userId: string }) {
  const [channels, setChannels] = useState<Array<Channel>>([]);

  const fetchData = useCallback(async () => {
    const result = await fetchChannels(userId);
    setChannels(result.data);
  }, [userId]);


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (channels.length > 0) {
    return (
      <div>
        <ChannelsListener userId={userId} channels={channels} setChannels={setChannels}>
        {channels.map((channel: any) => {
          const contact =
            channel.members[0].toString() === userId
              ? channel.members[1]
              : channel.members[0];
          return (
            <>
              <Link key={channel._id} href={`/welcome/chat/${channel._id}`}>
                <ContactCardMessage
                  currentUser={userId}
                  chat={channel.chat}
                  id={contact}
                  active={false}
                />
              </Link>
            </>
          );
        })}</ChannelsListener>
      </div>
    );
  }
}
