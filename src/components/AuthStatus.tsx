'use client';

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import GoogleSignInButton from "./GoogleSignInButton";

export default function AuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // Cleanup listener
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button 
            onClick={() => signOut(auth)}
            className="mt-2 text-sm text-red-500 underline"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <GoogleSignInButton />
      )}
    </div>
  );
}
