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
      requestedBy: inviter,
      requestedTo: accepter,
      status: "pending",
      dateCreated: new Date(),
    });

    await newChannel.save();
    return true;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function deleteChannelByID(channelID: string) {
  try {
    await Channel.findByIdAndDelete(channelID);
    return true;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function deleteChannelByName(name: string) {
  try {
    await Channel.findOneAndDelete({ name: name });
    return true;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
