import * as Ably from "ably";

export const NEXT_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export const realtime = new Ably.Realtime({
  authUrl: `${NEXT_URL}/api/chat`,
});
