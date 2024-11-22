"use client";

import { useEffect, useState } from "react";
import { realtime } from "@/app/lib/utilities/ably-realtime";

export default function useAblyPresence(channelName: string, clientId: string) {
  const [onlineUsers, setOnlineUsers] = useState<any>([]);

  useEffect(() => {
    const channel = realtime.channels.get(channelName);

    const updatePresence = async () => {
      const members = await channel.presence.get();
      setOnlineUsers(members.map((member) => member.clientId));
    };

    channel.presence.subscribe("enter", updatePresence);
    channel.presence.subscribe("leave", updatePresence);

    channel.presence.enter();
  }, [channelName, clientId]);

  return onlineUsers;
}
