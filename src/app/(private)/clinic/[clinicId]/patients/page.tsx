"use client";

import { withRoleProtection } from "@/components/common/withRoleProtection";
import { use } from "react";

type Props = {
  params: Promise<{ clinicId: string }>;
};

function PatientsPage({ params }: Props) {
  const { clinicId } = use(params);

  return (
    <div className="relative z-30 min-h-screen bg-white p-8 text-black">
    </div>
  );
}

export default withRoleProtection(PatientsPage, ["DOCTOR", "ADMIN"]);