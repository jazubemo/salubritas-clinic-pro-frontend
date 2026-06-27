"use client";

import AppointmentCalendar from "@/components/appointment/AppointmentCalendar";
import { withRoleProtection } from "@/components/common/withRoleProtection";
import { AppointmentProvider } from "@/context/AppointmentContext";
import { DoctorProvider } from "@/context/DoctorContext";
import { use } from "react";

type Props = {
  params: Promise<{ clinicId: string }>;
};

function AppointmentsPage({ params }: Props) {
  const { clinicId } = use(params);

  return (
    <div className="relative h-full z-30 bg-white flex-grow w-full overflow-hidden relative">
      <AppointmentProvider clinicId={clinicId}>
        <DoctorProvider clinicId={clinicId}>
          <AppointmentCalendar clinicId={clinicId} />
        </DoctorProvider>
      </AppointmentProvider>
    </div>
  );
}

export default withRoleProtection(AppointmentsPage, [
  "PATIENT",
  "DOCTOR",
  "ADMIN",
]);
