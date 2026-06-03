"use client";

import { ClinicMembership } from "@/__generated__/graphql";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface ClinicCardProps {
  membership: ClinicMembership;
}

export default function ClinicCard({ membership }: ClinicCardProps) {
  return (
    <div
      key={membership.clinicId}
      className="w-full flex flex-col gap-3 mb-1 cursor-pointer"
    >
      <Link
        href={`/clinic/${membership.clinicId}/appointments`}
        passHref
        className="w-full flex flex-col cursor-pointer"
        target="_blank"
      >
        <button className="w-full flex items-center justify-between px-5 py-5 border border-slate-100 bg-white rounded-xl shadow-sm text-slate-700 font-medium transition-all duration-200 hover:border-indigo-500 hover:bg-indigo-50/30 hover:text-indigo-600 group text-left cursor-pointer">
          {membership.name}
          <ExternalLink size={20} color="currentColor" strokeWidth={2} />
        </button>
      </Link>
    </div>
  );
}
