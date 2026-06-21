"use client";

import React, { use, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";

import { Appointment } from "@/__generated__/graphql";
import { DateSelectArg } from "@fullcalendar/core/index.js";
import { AppointmentEvent } from "@/common/types/AppointmentEvent";
import { ONE_HOUR_IN_MILLISECONDS } from "@/common/constants/time";

interface AppointmentCalendarProps {
  clinicId: string;
}

export default function Calendar({ clinicId }: AppointmentCalendarProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleSelect = (selectInfo: DateSelectArg) => {
    const durationInMinutes =
      selectInfo.end.getTime() - selectInfo.start.getTime();
    const durationInHours = durationInMinutes / ONE_HOUR_IN_MILLISECONDS;

    // 2. Enforce the 1-hour maximum clinic rule
    if (durationInHours > 1) {
      alert("Clinic rules limit appointments to a maximum of 1 hour.");
      selectInfo.view.calendar.unselect();
      return;
    }

    const patientName = prompt("Enter Patient Name:");
    selectInfo.view.calendar.unselect();

    const confirmedAppointmentColor = "#0B8043";
    const pendingAppointmentColor = "#617480"

    if (patientName) {
      const newAppointment: AppointmentEvent = {
        id: crypto.randomUUID(),
        _id: crypto.randomUUID(),
        title: patientName,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        clinicId: clinicId,
        startTime: selectInfo.startStr, // e.g., "2026-06-21T10:00:00"
        endTime: selectInfo.endStr, // e.g., "2026-06-21T11:00:00"
        status: "PENDING",
        isNewPatient: false,
        reason: "Routine Checkup",
        patientId: "6a30562acbc138294d977b46",
        patientName: "Henry Altman",
        doctorId: "6a3054facbc138294d977b30",
        doctorName: "Miranda Bailey",
        backgroundColor: confirmedAppointmentColor,
      };

      setAppointments((prev) => [...prev, newAppointment]);
    }
  };
  console.log("appointments", appointments);

  const getTimeOneHourAgo = () => {
    const now = new Date();
    now.setHours(now.getHours() - 1);
    return now;
  };

  const currentTimeOneHourAgoFormatted = useMemo(() => {
    const now = getTimeOneHourAgo();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}:00`;
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-4 box-border overflow-hidden">
      <div className="w-full max-w-full h-full max-h-full">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            multiMonthPlugin,
            interactionPlugin,
          ]}
          initialView="timeGridDay"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay",
          }}
          buttonText={{
            today: "Today",
            month: "Month",
            week: "Week",
            year: "Year",
            day: "Day",
          }}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: "short",
            hour12: true,
          }}
          height="100%"
          weekends={true}
          slotMinTime="08:00:00"
          slotMaxTime="16:00:00"
          slotDuration="00:15:00"
          allDaySlot={false}
          events={appointments}
          nowIndicator={true}
          scrollTime={currentTimeOneHourAgoFormatted}
          scrollTimeReset={false}
          timeZone="America/Tegucigalpa"
          selectable={true}
          select={(selectInfo: DateSelectArg) => handleSelect(selectInfo)}
        />
      </div>
    </div>
  );
}
