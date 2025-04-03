"use client";

import { signIn } from "next-auth/react";
import Header from "./../../components/layout/Header";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setCreatingUser(true);
    setUserCreated(false);
    setError(false);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    setEmail("");
    setPassword("");
    setCreatingUser(false);
    if (response.ok) {
      setUserCreated(true);
    }
    if (!response.ok) {
      setError(true);
    }
  }

  return (
    <>
      <Header />

      <section className="grid grid-cols-2 mt-10 ">
        <div className=" text-center flex flex-col gap-6 bg-primaryfade p-6">
          <p className="text-2xl">Register</p>
          {userCreated && (
            <div className="bg-lime-500 rounded-lg py-4">
              User created successfully.{" "}
              <Link href={"/login"} className="underline hover:text-white">
                {" "}
                Login here &raquo;
              </Link>
            </div>
          )}
          {error && (
            <div className="bg-red-500 rounded-lg py-4">
              Some error occured! Try again.
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col gap-4 w-64 mx-auto"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={creatingUser}
              required
              className=" px-4 py-2 rounded-lg outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              disabled={creatingUser}
              onChange={(e) => setPassword(e.target.value)}
              required
              className=" px-4 py-2 rounded-lg outline-none"
            />
            <button
              type="submit"
              disabled={creatingUser}
              className=" px-4 py-2 bg-blue text-white rounded-lg outline-none"
            >
              Register
            </button>
          </form>
          <div className="">
            Already have an account?
            <Link href={"/login"} className="text-blue font-bold">
              {" "}
              Sign In &raquo;
            </Link>
          </div>
          or
          <button
            className="w-64 flex gap-4 text-center mx-auto bg-white px-4 py-2 rounded-lg text-gray-600"
            onClick={() => signIn("google")}
            type="button"
          >
            <Image
              src="/google.png"
              alt=""
              width={20}
              height={20}
              className=" object-contain"
            />
            Continue with Google
          </button>
        </div>

        <div className="relative">
          <Image
            src={"/login.jpg"}
            alt=""
            layout="fill"
            objectFit="cover"
            className=""
          />
        </div>
      </section>
    </>
  );
}
