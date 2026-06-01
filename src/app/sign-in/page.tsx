"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";

import LogoBadge from "@/components/LogoBadge";
import AuthStatus from "@/components/AuthStatus";

export default function SignInPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated && pathname === "/sign-in") {
      router.replace("/select-clinic");
    }
  }, [isAuthenticated, pathname, router]);

  return (
    <>
      {!isAuthenticated && (
        <main className="relative z-20 bg-white px-6 py-10 rounded-2xl max-w-sm w-full shadow-2xl text-center mx-4">
          <LogoBadge />
          <h1 className="font-sans text-2xl font-bold text-slate-800 mb-8">
            Salubritas Clinic Pro
          </h1>
          <p className="font-sans text-sm text-slate-700 mt-3 mb-10 max-w-sm mx-auto leading-relaxed px-4">
            <span className="font-sans text-gray-600">
              Sign in to access your medical workspace.
            </span>
          </p>

          <AuthStatus />
        </main>
      )}
    </>
  );
}
