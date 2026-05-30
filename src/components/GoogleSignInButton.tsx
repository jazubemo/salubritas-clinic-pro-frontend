"use client";

import { deleteUser, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useApolloClient } from "@apollo/client/react";

import { GetMeQuery } from "@/__generated__/graphql";
import { GET_ME } from "@/graphql/queries/getMe";
import { useRouter } from "next/navigation";

interface ButtonProps {
  setIsVerifying: (value: boolean) => void;
}

export default function GoogleSignInButton({ setIsVerifying }: ButtonProps) {
  const apolloClient = useApolloClient();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const { user } = result;
    const token = await user.getIdToken();

    try {
      setIsVerifying(true);

      const { data, error: gqlError } = await apolloClient.query<GetMeQuery>({
        query: GET_ME,
        fetchPolicy: "network-only",
        context: {
          headers: { Authorization: `Bearer ${token}` },
        },
      });

      if (!data || !data.getMe || gqlError) {
        await deleteUser(user);
        await signOut(auth);
        router.replace("/access-denied");
        return;
      }

      console.log(`Verified Clinic Account: ${data.getMe.firstName}`);
      setIsVerifying(false);
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
        className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50"
      >
        <img src="/google.svg" alt="Google logo" className="w-5 h-5" />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}
