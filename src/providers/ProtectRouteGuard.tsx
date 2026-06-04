"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/store";
import Loader from "@/components/common/Loader";

export default function ProtectedRouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const publicPages = ["/sign-in", "/", "/access-denied"];
  
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const isPublicPage = publicPages.includes(pathname);

    if (!isAuthenticated && !isPublicPage) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated && !publicPages.includes(pathname)) {
    return <Loader message="Securing medical workspace..." fullPage={true} />;
  }

  return <>{children}</>;
}
