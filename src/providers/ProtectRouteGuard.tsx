"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/store";
import Loader from "@/components/Loader";

export default function ProtectedRouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const publicPages = ["/sign-in", "/"];
    const isPublicPage = publicPages.includes(pathname);


    if (!isAuthenticated && !isPublicPage) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated && pathname !== "/sign-in") {
    return <Loader message="Securing medical workspace..." fullPage={true} />;
  }

  return <>{children}</>;
}
