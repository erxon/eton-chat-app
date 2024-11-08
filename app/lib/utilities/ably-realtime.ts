import * as Ably from "ably";

export const realtime = new Ably.Realtime({
  authUrl: "http://localhost:3000/api/chat",
});
