'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Header from "@/components/layout/Header";
// import { useAuth0 } from "@auth0/auth0-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState(false);
  // const { loginWithRedirect } = useAuth0();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoginInProgress(true);
    setError(false);

    await signIn("credentials", { email, password,  callbackUrl: "/" });

    // setEmail("");
    // setPassword("");
    setLoginInProgress(false);
  }

  async function handleGoogleSignIn() {
    signIn("google", {
      callbackUrl: "http://localhost:3000",
    });
  }

  return (
    <>
      <Header />

      <section className="grid grid-cols-2 mt-10 ">
        <div className=" text-center flex flex-col gap-6 bg-primaryfade p-6">
          <p className="text-2xl">Login</p>
          {/* {userCreated && (
            <div className="bg-lime-500 rounded-lg py-4">
              User created successfully. <Link href={'/login'} className="underline hover:text-white"> Login here &raquo;</Link>
            </div>
          )} */}
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
              disabled={loginInProgress}
              required
              className=" px-4 py-2 rounded-lg outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              disabled={loginInProgress}
              required
              onChange={(e) => setPassword(e.target.value)}
              className=" px-4 py-2 rounded-lg outline-none"
            />
            <button
              type="submit"
              disabled={loginInProgress}
              className=" px-4 py-2 bg-blue text-white rounded-lg outline-none"
            >
              Login
            </button>
          </form>
          <div className="">
            Don't have an account yet?
            <Link href={"/register"} className=" text-blue font-bold">
              {" "}
              Register now &raquo;
            </Link>
          </div>
          or
          <button
            type="submit"
            className="w-64 flex gap-4 text-center mx-auto bg-white px-4 py-2 rounded-lg text-gray-600"
            onClick={handleGoogleSignIn}
          >
            <img src="/google.png" alt="" width={"24px"} />
            Continue with Google
          </button>


          {/* <button onClick={() => loginWithRedirect()}>Log In</button> */}

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
