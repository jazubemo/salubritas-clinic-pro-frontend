"use client"

import { useAppSelector } from "@/lib/store";

import ClinicCard from "./ClinicCard";


export default function ClinicCardContainer() {
  const { clinicMemberships: activeClinicMemberships  = [] } = useAppSelector((state) => state.auth.user) || {};

  return (
    <div className="w-full flex flex-col items-center gap-2 mb-8">
      <p className="w-full text-left font-sans font-bold text-xs  uppercase tracking-wider text-slate-400 pl-1 mb-2">
        Select a clinic to open
      </p>
      {activeClinicMemberships.map((clinic) => {
        return <ClinicCard key={clinic.clinicId} clinic={clinic} />;
      })}
    </div>
  );
}
