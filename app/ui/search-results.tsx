import { findUser } from "../lib/chat/actions";
import { fetchUserByEmail } from "../lib/data";
import UserCard from "./find/user-card";
import { auth } from "@/auth";

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

  return (
    <div className="md:w-3/4 w-full mx-auto">
      {foundUsers &&
        (foundUsers?.length === 0 ? (
          <p className="text-left text-neutral-500 mb-3">User not found</p>
        ) : (
          <p className="text-left text-neutral-500 mb-3">Results</p>
        ))}
      {foundUsers?.map((user: User) => {
        return (
          <UserCard
            key={user.id}
            query={query}
            currentUser={currentUser?.id}
            userID={user.id}
            name={user.name}
            image={user.image}
            email={user.email}
          />
        );
      })}
    </div>
  );
}
