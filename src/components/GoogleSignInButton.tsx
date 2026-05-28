// components/GoogleSignInButton.tsx
"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import Image from "next/image";

export default function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // The signed-in user info
      const user = result.user;
      console.log("Successfully logged in:", user.displayName);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50"
    >
      <img src="/google.svg" alt="Google logo" className="w-5 h-5" />
      <span>Sign in with Google</span>
    </button>
  );
}
