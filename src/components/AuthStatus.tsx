"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import GoogleSignInButton from "./GoogleSignInButton";

export default function AuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading || isVerifying) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        <p className="text-sm text-gray-500">Verifying clinic credentials...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {user && !isVerifying ? (
          <>
            <p>Welcome, {user.displayName}!</p>
            <button
              onClick={() => signOut(auth)}
              className="mt-2 text-sm text-red-500 underline"
            >
              Sign Out
            </button>
          </>
        ) : (
          <GoogleSignInButton setIsVerifying={setIsVerifying} />
        )}
      </div>
    </div>
  );
}
