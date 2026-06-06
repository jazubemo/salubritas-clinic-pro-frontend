"use client";

import { withRoleProtection } from "@/components/common/withRoleProtection";
import { use } from "react";

type Props = {
  params: Promise<{ clinicId: string }>;
};

function AppointmentsPage({ params }: Props) {
  const { clinicId } = use(params);

  return (
    <div className="relative z-50 min-h-screen bg-white p-8 text-black">
      <h1 className="text-2xl font-bold">Clinic ID: {clinicId}</h1>
      <p className="mt-2 text-lg">Appointment List</p>
    </div>
  );
}

export default withRoleProtection(AppointmentsPage, ["PATIENT", "DOCTOR", "ADMIN"]);