"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store";
import { useApolloClient } from "@apollo/client/react";

import { verifyAndSyncUserThunk } from "@/graphql/thunks/verifyAndSyncUserThunk";

interface Props {
  setIsVerifying: (value: boolean) => void;
}

export default function SignInWithEmailAndPassword({ setIsVerifying }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const apolloClient = useApolloClient();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsVerifying(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const { user } = userCredential;

      const token = await user.getIdToken();

      dispatch(
        verifyAndSyncUserThunk({
          user,
          token,
          auth,
          router,
          apolloClient,
        }),
      );
    } catch (error: any) {
      console.error("Error signing in with Email and Password:", error);
      await signOut(auth);
      router.replace("/access-denied");
    }
  };

  return (
    <div className="flex flex-col items-start w-full">
      <form onSubmit={handleSignIn} className="w-full flex flex-col gap-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-sans font-bold text-gray-700 mb-1 text-left"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@clinic.com"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm placeholder-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-sans  font-bold text-gray-700 mb-1 text-left"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm placeholder-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 bg-slate-900 hover:bg-slate-900 text-white font-medium text-sm py-2.5 rounded-lg transition-colors shadow-md cursor-pointer"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
