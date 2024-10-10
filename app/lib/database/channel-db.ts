import Channel from "../models/Channel";

export interface Channel {
  name?: string;
  members?: string[];
  requestedBy?: string;
  requestedTo?: string;
  userId?: string;
  contact?: string;
  status?: string;
  chat?: string[];
  dateCreated?: Date;
  dateModified?: Date;
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

export async function editChannel(
  userID: string,
  contact: string,
  update: Channel,
) {
  try {
    await Channel.findOneAndUpdate(
      { $and: [{ members: userID }, { members: contact }] },
      update
    );
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function addNewChat(chatId: string, channelId: string) {
  try {
    const channel = await Channel.findById(channelId);
    const chats = channel.chat;
    const addChat = [...chats, chatId];

    await Channel.findByIdAndUpdate(channelId, {
      chat: addChat,
    });

    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
