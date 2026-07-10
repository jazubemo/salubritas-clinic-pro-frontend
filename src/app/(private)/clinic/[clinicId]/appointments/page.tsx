"use client";

import AppointmentCalendar from "@/components/appointment/AppointmentCalendar";
import { withRoleProtection } from "@/components/common/withRoleProtection";
import DoctorFilterDropdown from "@/components/doctor/DoctorScheduleFilter ";
import { selectClinicByParamsId } from "@/lib/features/auth/authSelectors";

import { AppointmentProvider } from "@/providers/AppointmentProvider";
import { CalendarProvider } from "@/providers/CalendarProvider";
import { DoctorProvider } from "@/providers/DoctorProvider";
import { use } from "react";
import { useSelector } from "react-redux";

type Props = {
  params: Promise<{ clinicId: string }>;
};

function AppointmentsPage({ params }: Props) {
  const { clinicId } = use(params);

  const currentClinic = useSelector((state) =>
    selectClinicByParamsId(state, clinicId),
  );

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <CalendarProvider clinicId={clinicId}>
        <DoctorProvider clinicId={clinicId}>
          {currentClinic?.roles.includes("ADMIN") ? (
            <DoctorFilterDropdown />
          ) : null}

          <div className="relative flex-1 w-full min-h-0 bg-white overflow-hidden">
            <AppointmentProvider clinicId={clinicId}>
              <AppointmentCalendar clinicId={clinicId} />
            </AppointmentProvider>
          </div>
        </DoctorProvider>
      </CalendarProvider>
    </div>
  );
}

export default withRoleProtection(AppointmentsPage, [
  "PATIENT",
  "DOCTOR",
  "ADMIN",
]);
