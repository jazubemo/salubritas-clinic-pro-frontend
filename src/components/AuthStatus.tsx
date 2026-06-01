"use client";

import { useEffect, useState } from "react";
import GoogleSignInButton from "./GoogleSignInButton";
import Loader from "./Loader";
import { useAppSelector } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";

export default function AuthStatus() {
  const router = useRouter();
  const pathname = usePathname();

  const [isVerifying, setIsVerifying] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && pathname === "/sign-in") {
      router.replace("/select-clinic");
    }
  }, [isAuthenticated, pathname, router]);


  if (isVerifying) {
    return <Loader message="Verifying clinic credentials..." />;
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
        <GoogleSignInButton setIsVerifying={setIsVerifying} />
      </div>
    </div>
  );
}
