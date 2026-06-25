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
import { useAppointments } from "@/hooks/useAppointments";

interface AppointmentCalendarProps {
  clinicId: string;
}

export default function Calendar({ clinicId }: AppointmentCalendarProps) {
  const { appointments, loading, error } = useAppointments();


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
          // slotMinTime="08:00:00"
          // slotMaxTime="16:00:00"
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
