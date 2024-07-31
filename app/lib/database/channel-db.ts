import Channel from "../models/Channel";

interface Channel {
  name: String;
  members: String[];
}

export async function create(inviter: String, accepter: String) {
  try {
    const newChannel = await new Channel({
      name: `${inviter}-${accepter}`,
      members: [inviter, accepter],
      status: "pending",
      dateCreated: new Date(),
    });

    await newChannel.save();
    return true;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
