import Loading from "@/app/ui/components/Loading";
import { Suspense } from "react";
import Pending from "../components/pending";

export default function Page(){
    return <>
        <Suspense fallback={<Loading />}>
            <Pending />
        </Suspense>
    </>
}

