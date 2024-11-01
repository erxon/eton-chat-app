import Loading from "@/app/ui/components/Loading";
import Profile from "@/app/ui/users/profile";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <div>
        <Suspense
          fallback={
            <div className="w-3/4 flex gap-2">
              Loading <Loading />
            </div>
          }
        >
          <Profile id={params.id} />
        </Suspense>
      </div>
    </>
  );
}
