import { findUser } from "@/app/lib/chat/actions";
import { fetchUserByEmail } from "@/app/lib/user/data";
import UserCard from "./user-card";
import { auth } from "@/auth";
import { fetchChannels } from "@/app/lib/channel/data";
import { Channel } from "@/app/lib/channel/data";
import { fetchContacts } from "@/app/lib/profile/data";

interface User {
  name: string;
  id: string;
  email: string;
  image: string;
}

export default async function Results({ query }: { query: string }) {
  const foundUsers = await findUser(query);
  const session = await auth();
  const currentUser = await fetchUserByEmail(session?.user?.email);
  const currentUserChannels = await fetchChannels(currentUser?.id);
  const contacts = await fetchContacts(currentUser?.email);

  function userReceivedRequest(userID: string) {
    const result = !!currentUserChannels.find((channel: Channel) => {
      return (
        channel.requestedTo.toString() === userID &&
        channel.requestedBy.toString() === currentUser?.id &&
        channel.status === "pending"
      );
    });

    return result;
  }

  function userRequest(userID: string) {
    const result = !!currentUserChannels.find((channel: Channel) => {
      return (
        channel.requestedBy.toString() === userID &&
        channel.requestedTo.toString() === currentUser?.id &&
        channel.status === "pending"
      );
    });
    return result;
  }

  function isContact(userID: string) {
    if (!contacts) {
      return false;
    }

    const result = !!contacts.find((contact: string) => {
      return userID === contact.toString();
    });

    return result;
  }

  return (
    <div className="md:w-3/4 w-full mx-auto">
      {foundUsers &&
        (foundUsers?.length === 0 ? (
          <p className="text-left text-neutral-500 mb-3">User not found</p>
        ) : (
          <p className="text-left text-neutral-500 mb-3">Results</p>
        ))}
      {foundUsers?.map((user: User) => {
        if (!(currentUser?.id === user.id)) {
          return (
            <UserCard
              key={user.id}
              query={query}
              currentUser={currentUser?.id}
              userID={user.id}
              name={user.name}
              image={user.image}
              email={user.email}
              userRequest={userRequest(user.id)}
              userReceivedRequest={userReceivedRequest(user.id)}
              isContact={isContact(user.id)}
            />
          );
        }
      })}
    </div>
  );
}
