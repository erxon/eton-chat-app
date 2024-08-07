import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="w-full m-10 md:w-1/2 lg:w-1/3 md:m-0 text-center p-5 rounded">{children}</div>
    </main>
  );
}
