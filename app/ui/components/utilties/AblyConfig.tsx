"use client";

import { realtime } from "@/app/lib/utilities/ably-realtime";
import { AblyProvider } from "ably/react";
import { ReactNode } from "react";

export default function AblyConfig({ children }: { children: ReactNode }) {
  return (
    <>
      <AblyProvider client={realtime}>{children}</AblyProvider>
    </>
  );
}
