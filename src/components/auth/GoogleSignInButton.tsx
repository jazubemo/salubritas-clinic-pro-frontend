"use client";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useApolloClient } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store";

import Image from "next/image";

import { verifyAndSyncUserThunk } from "@/graphql/thunks/verifyAndSyncUserThunk";

interface ButtonProps {
  setIsVerifying: (value: boolean) => void;
}

export default function GoogleSignInButton({ setIsVerifying }: ButtonProps) {
  const dispatch = useAppDispatch();
  const apolloClient = useApolloClient();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsVerifying(true);

    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
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
    } catch (error) {
      console.error("Error signing in with Google:", error);
      await signOut(auth);
      router.replace("/access-denied");
    }
  };

  return (
    <div className="w-auto flex justify-center items-center px-4">
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
      >
        <Image
          src="/google.svg"
          alt="Google logo"
          className="w-5 h-5"
          width={24}
          height={24}
        />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}
