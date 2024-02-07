"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const session = useSession();
  console.log(session);
  const status = session?.status;
  const userData = session.data?.user;
  const username = userData?.name || userData?.email;

  return (
    <header className="flex items-center justify-between">
      <Link href={"/"} className="text-primary font-semibold text-2xl">
        Food
      </Link>
      <nav className="flex items-center gap-8 text-gray-600">
        <Link href={"/"}>Home</Link>
        <Link href={"/menu"}>Menu</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/contact"}>Contact</Link>
      </nav>
      <nav className=" flex items-center gap-4">
        {status === "authenticated" ? (
          <>
            <Link
              href={"/profile"}
              className="flex items-center gap-2 border border-primary rounded-full px-4 py-2 text-gray-600"
            >
              Hello, {username}
            </Link>

            <button
              onClick={() => signOut()}
              className="bg-primary text-white px-6 py-2 rounded-full"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link href={"/login"} className="text-gray-600 px-6 py-2">
              Log In
            </Link>
            <Link
              href={"/register"}
              className="bg-primary text-white px-6 py-2 rounded-full"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
