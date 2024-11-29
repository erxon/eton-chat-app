import Loading from "@/app/ui/components/Loading";
import { Suspense } from "react";
import Requests from "../components/requests";

export default function Page() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Requests />
      </Suspense>
    </>
  );
}
