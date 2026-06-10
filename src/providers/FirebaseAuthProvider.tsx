"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAppDispatch } from "@/lib/store";
import { setCredentials, logOut } from "@/lib/features/auth/authSlice";

import { GET_ME } from "@/graphql/queries/getMe";
import { GetMeQuery } from "@/__generated__/graphql";
import { useLazyQuery } from "@apollo/client/react";

import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";

export default function FirebaseAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [loadingSession, setLoadingSession] = useState(true);

  const [fetchDbUser] = useLazyQuery<GetMeQuery>(GET_ME, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "logout-event") {
        dispatch(logOut());
        router.replace("/sign-in");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const { data } = await fetchDbUser();

          if (data?.getMe) {
            dispatch(setCredentials(data.getMe));
          }
        } catch (error) {
          console.error("Failed to fetch DB user profile:", error);
          dispatch(logOut());
        }
      } else {
        dispatch(logOut());
      }
      setLoadingSession(false);
    });

    return () => unsubscribe();
  }, [dispatch, fetchDbUser]);

  if (loadingSession) {
    return <Loader message="Verifying security session..." fullPage={true} />;
  }

  return <>{children}</>;
}
