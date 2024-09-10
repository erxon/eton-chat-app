"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div>
      <h2 className="font-bold mb-3">Error</h2>
      <p className="mb-1">Something went wrong retrieving user</p>
      <a href="/welcome" className="text-blue-500">
        Home
      </a>
    </div>
  );
}
