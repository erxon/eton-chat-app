import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2 className="font-bold mb-3">User Not Found</h2>
      <p className="mb-1">Could not find requested resource</p>
      <Link className="text-blue-500" href="/">Return home</Link>
    </div>
  );
}
