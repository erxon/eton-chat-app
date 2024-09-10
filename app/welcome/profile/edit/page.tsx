import React from "react";
import EditProfileForm from "@/app/ui/edit-profile";
import { auth } from "@/auth";
import { fetchAccount, fetchUserByEmail } from "@/app/lib/user/data";
import { fetchProfile } from "@/app/lib/profile/data";

export default async function Page() {
  const session = await auth();
  if (!session?.user) return;

  const user = await fetchUserByEmail(session?.user?.email);
  const profile = await fetchProfile(user?.email);
  const userId = user ? user.id : null;
  const account = await fetchAccount(userId);
  const withProvider : boolean = account && account.provider;
  const name = user?.name.split(" ");


  return (
    <main className="p-3 relative">
      <h1 className="mb-3">Profile</h1>
      <EditProfileForm
        firstName={name[0]}
        lastName={name[1]}
        email={user?.email}
        image={user?.image}
        address={profile?.address}
        about={profile?.about}
        birthday={profile?.birthday}
        gender={profile?.gender}
        contactNumber={profile?.contactNumber}
        age={profile?.age}
        withProvider={withProvider}
      />
    </main>
  );
}
