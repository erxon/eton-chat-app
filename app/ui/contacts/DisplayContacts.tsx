"use client";

import { useState, useEffect, useCallback } from "react";
import ContactCardMessage from "./ContactCardMessage";
import Link from "next/link";
import { Channel, fetchUserChannels } from "@/app/lib/channel/data";
import ChannelsListener from "./ChannelsListener";
import { fetchChannels } from "../fetch/channels";
import { useParams } from "next/navigation";
import useAblyPresence from "../hooks/useAblyPresence";

export default function DisplayContacts({ userId }: { userId: string }) {
  const [channels, setChannels] = useState<Array<Channel>>([]);
  const { id } = useParams();
  const currentChannelId = id ? id.toString() : "";
  const onlineUsers = useAblyPresence("chat", userId);

  const fetchData = useCallback(async () => {
    const result = await fetchChannels(userId);
    setChannels(result.data);
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, currentChannelId]);

  if (channels.length > 0) {
    return (
      <div>
        <ChannelsListener userId={userId} setChannels={setChannels}>
          {channels.map((channel: any) => {
            if (channel.status === "active") {
              const contact =
                channel.members[0].toString() === userId
                  ? channel.members[1]
                  : channel.members[0];

              const isActive = onlineUsers.indexOf(contact) !== -1;

              return (
                <>
                  <Link key={channel._id} href={`/welcome/chat/${channel._id}`}>
                    <ContactCardMessage
                      currentChannelId={currentChannelId}
                      channelId={channel._id}
                      currentUser={userId}
                      chat={channel.chat}
                      id={contact}
                      active={false}
                      contactIsActive={isActive}
                    />
                  </Link>
                </>
              );
            }
          })}
        </ChannelsListener>
      </div>
    );
  }
}
