"use client";

import { Channel } from "@/app/lib/channel/data";
import { ReactNode, useEffect, useState, Dispatch, SetStateAction, useCallback } from "react";
import { useAbly } from "ably/react";
import { realtime } from "@/app/lib/utilities/ably-realtime";
import { fetchChannels } from "../fetch/channels";

export default function ChannelsListener({
  channels,
  children,
  userId,
  setChannels,
}: {
  channels: Channel[];
  children: ReactNode;
  userId: string;
  setChannels : Dispatch<SetStateAction<Channel[]>>
}) {
  const [message, setMessage] = useState<any>({});

  const fetchData = useCallback(async () => {
    const result = await fetchChannels(userId);
    setChannels(result.data);
  }, [userId, setChannels])

  useEffect(() => {
    if (!channels || channels.length === 0) return;

    channels.map((channel: any) => {
      const ablyChannel = realtime.channels.get(channel._id);
      console.log(ablyChannel)
      ablyChannel.subscribe((message) => {
        
        /*
        Manipulate the channel:

        1st way:
            1. Store the channel to a temporary variable T;
            2. FilteredChannels = get channels that is not T;
            3. Re-add T to FilteredChannels (this will make T appear on top);
            4. Set channels to FilteredChannels 
        2nd way:
            1. Set channel.dateModifed = current date
            2. SortedChannels = sort channels
            3. Set channels to SortedChannels
        3rd way: just refetch the channel
        */
        fetchData();
        setMessage(message);
      });
      return ablyChannel;
    });


  }, [channels, fetchData]);

  return (
    <>
      <div>{children}</div>
    </>
  );
}
