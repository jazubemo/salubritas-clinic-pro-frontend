"use client";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import {
  Calendar,
  Users,
  HeartPulse,
} from "lucide-react";

import NavBarItem, { NavBarTitle } from "./NavBarItem";
import ClinicSwitcher from "./ClinicSwitcher";
import UserProfileDropdown from "./UserProfileDropdown";

export default function Navbar() {
  const pathname = usePathname();
  const { clinicId } = useParams() as { clinicId: string };

  const user = useSelector((state: RootState) => state.auth.user);
  const userClinicMemberships = user?.clinicMemberships || [];

  const currentClinic = user?.clinicMemberships.find(
    (clinicMembership) => clinicMembership.clinicId === clinicId,
  );

  const appointmentsPath = `/clinic/${clinicId}/appointments`;
  const patientsPath = `/clinic/${clinicId}/patients`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-md px-6 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href={appointmentsPath}
            className="flex items-center gap-2 font-bold text-white text-lg tracking-wide hover:opacity-90 transition-opacity"
          >
            <div className="h-8 w-8 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 font-black">
              <HeartPulse
                className="w-8 h-8"
                strokeWidth={2.2}
                color="currentColor"
              />
            </div>
            <span>Salubritas Clinic Pro</span>
          </Link>

          <div className="flex items-center gap-1">
            <NavBarItem
              clinicId={clinicId}
              currentPathname={pathname}
              title={NavBarTitle.Appointments}
              Icon={
                <Calendar
                  className={`h-4 w-4 ${pathname === appointmentsPath ? "text-cyan-400" : "text-white/50"}`}
                />
              }
            />
            <NavBarItem
              clinicId={clinicId}
              currentPathname={pathname}
              title={NavBarTitle.Patients}
              Icon={
                <Users
                  className={`h-4 w-4 ${pathname === patientsPath ? "text-cyan-400" : "text-white/50"}`}
                />
              }
            />

          </div>
        </div>

        <div className="flex items-center gap-6">
          <ClinicSwitcher clinics={userClinicMemberships} currentClinic={currentClinic} />
          <UserProfileDropdown />
        </div>
      </div>
    </nav>
  );
}
