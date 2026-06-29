"use client";

import { useParams, usePathname } from "next/navigation";

import { useAppSelector } from "@/lib/store";
import { selectClinicByParamsId } from "@/lib/features/auth/authSelectors";

import NavBarItem, { NavBarTitle } from "./NavBarItem";
import ClinicSwitcher from "./ClinicSwitcher";
import UserProfileDropdown from "./UserProfileDropdown";
import NavBarLogo from "./NavBarLogo";

export default function Navbar() {
  const pathname = usePathname();
  const { clinicId: currentClinicId } = useParams() as { clinicId: string };

  const currentClinic = useAppSelector((state) =>
    selectClinicByParamsId(state, currentClinicId),
  );

  const isPatient = (): boolean => {
    return (
      currentClinic?.roles.some((clinic) => clinic.includes("PATIENT")) || false
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-md px-6 py-3">
      <div className="flex max-w-full items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center">
            <NavBarLogo />
          </div>

          <div className="flex items-center gap-1">
            <NavBarItem
              clinicId={currentClinicId}
              currentPathname={pathname}
              title={NavBarTitle.Appointments}
            />
            {!isPatient() && (
              <NavBarItem
                clinicId={currentClinicId}
                currentPathname={pathname}
                title={NavBarTitle.Patients}
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <ClinicSwitcher currentClinicId={currentClinicId} />
          <UserProfileDropdown />
        </div>
      </div>
    </nav>
  );
}
