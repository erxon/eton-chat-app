import Link from "next/link";
import Contacts from "./components/contacts";
import { Suspense } from "react";
import Loading from "@/app/ui/components/Loading";

export default function Page() {
  return (
    <>
      <div>
        <Suspense fallback={<Loading />}>
          <Contacts />
        </Suspense>
      </div>
    </>
  );
}
