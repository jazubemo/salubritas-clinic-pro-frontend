"use client";

import { useParams, usePathname } from "next/navigation";

import NavBarItem, { NavBarTitle } from "./NavBarItem";
import ClinicSwitcher from "./ClinicSwitcher";
import UserProfileDropdown from "./UserProfileDropdown";
import NavBarLogo from "./NavBarLogo";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";


export default function Navbar() {
  const pathname = usePathname();
  const { clinicId } = useParams() as { clinicId: string };

  const user = useSelector((state: RootState) => state.auth.user);
  const availableClinics = user?.clinicMemberships || [];

  const currentClinic = availableClinics.find(
    (clinicMembership) => clinicMembership.clinicId === clinicId,
  );

  const isPatient = (): boolean => {
    return currentClinic?.roles.some((clinic) => clinic.includes("PATIENT")) || false;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-md px-6 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-8">
          <NavBarLogo />

          <div className="flex items-center gap-1">
            <NavBarItem
              clinicId={clinicId}
              currentPathname={pathname}
              title={NavBarTitle.Appointments}
            />
            {!isPatient() && (
              <NavBarItem
                clinicId={clinicId}
                currentPathname={pathname}
                title={NavBarTitle.Patients}
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <ClinicSwitcher clinics={availableClinics} currentClinic={currentClinic} />
          <UserProfileDropdown />
        </div>
      </div>
    </nav>
  );
}
