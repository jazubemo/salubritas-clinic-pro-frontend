"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAppDispatch } from "@/lib/store";
import { setCredentials, logOut } from "@/lib/features/auth/authSlice";
import { GET_ME } from "@/graphql/queries/getMe";
import { useLazyQuery } from "@apollo/client/react";
import { GetMeQuery } from "@/__generated__/graphql";

export default function FirebaseAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [loadingSession, setLoadingSession] = useState(true);

  const [fetchDbUser] = useLazyQuery<GetMeQuery>(GET_ME, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();

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
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
        <p>Loading session...</p>
      </div>
    );
  }

  return <>{children}</>;
}
