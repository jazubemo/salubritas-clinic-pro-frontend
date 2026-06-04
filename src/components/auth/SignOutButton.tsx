"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("click");

      router.replace("/sign-in");
    } catch (error) {
      console.log(`Error`, error);
    }
  };
  return (
    <button
      onClick={() => handleSignOut()}
      className="text-sm font-sans text-slate-400 hover:text-slate-600 transition-colors underline underline-offset-4 cursor-pointer"
    >
      Sign Out
    </button>
  );
}
