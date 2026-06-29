"use client";

import AppointmentCalendar from "@/components/appointment/AppointmentCalendar";
import { withRoleProtection } from "@/components/common/withRoleProtection";
import DoctorFilterDropdown from "@/components/doctor/DoctorScheduleFilter ";
import { AppointmentProvider } from "@/context/AppointmentContext";
import { DoctorProvider } from "@/context/DoctorContext";
import { use } from "react";

type Props = {
  params: Promise<{ clinicId: string }>;
};

function AppointmentsPage({ params }: Props) {
  const { clinicId } = use(params);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <DoctorProvider clinicId={clinicId}>
        <DoctorFilterDropdown />

        <div className="relative z-30 flex-1 w-full min-h-0 bg-white overflow-hidden">
          <AppointmentProvider clinicId={clinicId}>
            <AppointmentCalendar clinicId={clinicId} />
          </AppointmentProvider>
        </div>
      </DoctorProvider>
    </div>
  );
}

export default withRoleProtection(AppointmentsPage, [
  "PATIENT",
  "DOCTOR",
  "ADMIN",
]);
