import Profile from "@/app/ui/profile";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile id={params.id} />
        </Suspense>
      </div>
    </>
  );
}
