"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { ClinicMembership, Role } from "@/__generated__/graphql";
import Loader from "./Loader";

interface RootState {
  auth: {
    user: {
      clinicMemberships: ClinicMembership[];
    } | null;
  };
}

export function withRoleProtection<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: Role[],
) {
  return function ProtectedComponent(props: P) {
    const router = useRouter();
    const params = useParams();
    const clinicId = params?.clinicId as string;

    const user = useSelector((state: RootState) => state.auth.user);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      if (!user || !user.clinicMemberships) {
        router.replace("/sign-in");
        return;
      }

      const clinicMembership = user.clinicMemberships.find(
        (clinic) => clinic.clinicId === clinicId && clinic.status === "ACTIVE",
      );

      if (!clinicMembership) {
        router.replace("/access-denied");
        return;
      }

      const hasValidRole = clinicMembership.roles.some((userRole) =>
        allowedRoles.includes(userRole),
      );

      if (!hasValidRole) {
        router.replace("/access-denied");

        return;
      }

      setIsAuthorized(true);
    }, [user, router, clinicId]);


    if (!isAuthorized) {
      return (
        <Loader message="Verifying clinic credentials..." />
      );
    }

    return <WrappedComponent {...props} />;
  };
}
