"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  Calendar,
  Users,
  User,
  ChevronDown,
  HeartPulse,
} from "lucide-react";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

import SignOutButton from "../../auth/SignOutButton";
import NavBarItem, { NavBarTitle } from "./NavBarItem";
import ClinicSwitcher from "./ClinicSwitcher";

export default function Navbar() {
  const pathname = usePathname();
  const { clinicId } = useParams() as { clinicId: string };

  const user = useSelector((state: RootState) => state.auth.user);
  const userClinicMemberships = user?.clinicMemberships || [];

  const currentClinic = user?.clinicMemberships.find(
    (clinicMembership) => clinicMembership.clinicId === clinicId,
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const appointmentsPath = `/clinic/${clinicId}/appointments`;
  const patientsPath = `/clinic/${clinicId}/patients`;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          <div className="relative z-50" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 rounded-full p-1 pr-3 transition-colors hover:bg-white/5 focus:outline-none"
            >
              {/* Profile Avatar Grid */}
              <div className="h-9 w-9 overflow-hidden rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white">
                <User className="h-5 w-5 text-white/60" />
              </div>

              <ChevronDown
                className={`h-4 w-4 text-white/60 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-50 right-0 mt-2 w-56 origin-top-right rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 duration-100">
                <div className="px-3 py-2 border-b border-white/5 mb-1">
                  <p className="text-xs text-white/40 font-medium">
                    Signed in as
                  </p>
                  <p className="text-sm font-semibold text-white truncate">
                    {user?.firstName}
                  </p>
                  {user?.email && (
                    <p className="text-xs text-white/50 truncate mt-0.5">
                      {user.email}
                    </p>
                  )}
                </div>

                <SignOutButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
