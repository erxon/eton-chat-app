import { Suspense } from "react";
import Contacts from "@/app/ui/contacts/Contacts";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-full">
        <h2 className="font-semibold mb-3">Messages</h2>
        <div className="grid grid-cols-3 box-border chat-page">
          <div className="col-span-1">
            <div className="overflow-y-hidden bg-white shadow rounded-lg h-full">
              <Suspense fallback={<div>Loading...</div>}>
                <Contacts />
              </Suspense>
            </div>
          </div>
          <div className="col-span-2 mx-5 bg-white rounded-lg shadow">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
