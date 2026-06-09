"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";

import LogoBadge from "@/components/common/AppLogo";
import Loader from "@/components/common/Loader";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { SubHeading } from "@/components/common/SubHeading";
import SignInWithEmailAndPassword from "@/components/auth/SignInWithEmailAndPassword";

export default function SignInPage() {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (isAuthenticated && pathname === "/sign-in" && user) {
      if (user.clinicMemberships.length > 1) {
        router.replace("/select-clinic");
        return;
      }
      const currentClinic = user.clinicMemberships[0];
      router.replace(`/clinic/${currentClinic.clinicId}/appointments`);
    }
  }, [isAuthenticated, pathname, router, user]);

  if (isVerifying) {
    return <Loader message="Verifying clinic credentials..." />;
  }

  return (
    <>
      {!isAuthenticated && (
        <main className="relative z-20 bg-white px-8 py-10 rounded-2xl max-w-2xl w-full shadow-2xl text-center mx-4">
          <div className="flex flex-col items-center justify-center mb-2">
            <LogoBadge />
            <div>
              <SubHeading>Sign in to access your medical workspace.</SubHeading>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between gap-8 w-full">
            <div className="flex-1 w-full text-left">
              <SignInWithEmailAndPassword setIsVerifying={setIsVerifying} />
            </div>

            <div className="flex flex-col items-center justify-center self-stretch py-2 min-h-[160px]">
              <div className="w-[1px] flex-grow bg-gray-200"></div>
              <span className="my-3 text-xs font-bold tracking-wider text-gray-400 uppercase">
                OR
              </span>
              <div className="w-[1px] flex-grow bg-gray-200"></div>
            </div>

            <div className="flex-1 w-full flex items-center justify-center">
              <GoogleSignInButton setIsVerifying={setIsVerifying} />
            </div>
          </div>
        </main>
      )}
    </>
  );
}
