"use client"

import { useAppSelector } from "@/lib/store";

import ClinicCard from "./ClinicCard";

import { Status } from '@/__generated__/graphql';

export default function ClinicCardContainer() {
  const { clinicMemberships } = useAppSelector((state) => state.auth.user);
  const activeClinicMemberships = clinicMemberships.filter((clinic) => clinic.status === "ACTIVE")

  return (
    <div className="w-full flex flex-col items-center gap-2 mb-8">
      <p className="w-full text-left font-sans font-bold text-xs  uppercase tracking-wider text-slate-400 pl-1 mb-2">
        Select a clinic to open
      </p>
      {activeClinicMemberships.map((membership) => {
        return <ClinicCard key={membership.clinicId} membership={membership} />;
      })}
    </div>
  );
}
