"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logOut } from "@/lib/features/auth/authSlice";

interface SignOutProps {
  customStyle?: string;
}

export default function SignOutButton({ customStyle }: SignOutProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(logOut());

      localStorage.setItem("logout-event", Date.now().toString());

      router.replace("/sign-in");
      
      await signOut(auth);
    } catch (error) {
      console.log(`Error`, error);
    }
  };

  return (
    <button
      onClick={() => handleSignOut()}
      className={
        customStyle
          ? customStyle
          : "w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors group"
      }
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </button>
  );
}
