import SignupForm from "@/app/ui/auth/signup-form";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1 className="font-medium">Signup</h1>
      <div className="mt-5">
        <SignupForm />
      </div>
      <p className="text-center mt-2 text-sm">
        Already have an account?{" "}
        <Link className="text-cyan-500 font-semibold" href="/login">
          Login
        </Link>
      </p>
    </>
  );
}
