import { fetchUserProfile } from "../lib/data";

export default async function Profile({ id }: { id: string }) {
  const profile = await fetchUserProfile(id);

  return (
    <>
      <div>{JSON.stringify(profile)}</div>
    </>
  );
}
