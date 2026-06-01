"use client";

import { useState } from "react";
import GoogleSignInButton from "./GoogleSignInButton";
import Loader from "./Loader";
import { useAppSelector } from "@/lib/store";

export default function AuthStatus() {
  const [isVerifying, setIsVerifying] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isVerifying) {
    return <Loader message="Verifying clinic credentials..." />;
  }

  return (
    <>
      {!isAuthenticated && (
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
            <GoogleSignInButton setIsVerifying={setIsVerifying} />
          </div>
        </div>
      )}
    </>
  );
}
