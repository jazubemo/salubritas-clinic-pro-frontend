"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";

import LogoBadge from "@/components/common/AppLogo";
import Loader from "@/components/common/Loader";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { SubHeading } from "@/components/common/SubHeading";

export default function SignInPage() {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (isAuthenticated && pathname === "/sign-in") {
      router.replace("/select-clinic");
    }
  }, [isAuthenticated, pathname, router]);

  if (isVerifying) {
    return <Loader message="Verifying clinic credentials..." />;
  }

  return (
    <>
      {!isAuthenticated && (
        <main className="relative z-20 bg-white px-6 py-10 rounded-2xl max-w-sm w-full shadow-2xl text-center mx-4">
          <LogoBadge />

          <SubHeading>Sign in to access your medical workspace.</SubHeading>

          <GoogleSignInButton setIsVerifying={setIsVerifying} />
        </main>
      )}
    </>
  );
}
