"use client";

import { AblyProvider, ChannelProvider } from "ably/react";
import { realtime } from "@/app/lib/utilities/ably-realtime";
import DisplayContacts from "./DisplayContacts";
import AblyConfig from "../components/utilties/AblyConfig";

export default function AblyConfigForContacts({ userId }: { userId: string }) {
  return (
    <>
      <AblyConfig>
        <ChannelProvider channelName={userId}>
          <DisplayContacts userId={userId} />
        </ChannelProvider>
      </AblyConfig>
    </>
  );
}
