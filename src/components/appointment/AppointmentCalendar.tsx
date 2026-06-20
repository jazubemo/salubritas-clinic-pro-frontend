"use client";

import React, { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";

export default function Calendar() {
  const testAppointments = [
    {
      id: "1",
      title: "Consulta General - Carlos Mendoza",
      start: "2026-06-20T08:30:00",
      end: "2026-06-20T09:30:00",
      backgroundColor: "#3b82f6",
      borderColor: "#2563eb",
    },
    {
      id: "2",
      title: "Chequeo Dental - Ana Martínez",
      start: "2026-06-20T14:00:00",
      end: "2026-06-20T15:00:00",
      backgroundColor: "#10b981",
      borderColor: "#059669",
    },
  ];

  const currentSystemTime = useMemo(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}:00`;
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-4 box-border overflow-hidden">
      <div className="w-full max-w-full h-full max-h-full">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, multiMonthPlugin]}
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
          height="100%"
          weekends={true}
          slotMinTime="06:00:00"
          slotMaxTime="19:00:00"
          allDaySlot={false}
          events={testAppointments}
          nowIndicator={true}
          scrollTime={currentSystemTime}
          scrollTimeReset={false}
          timeZone="America/Tegucigalpa"
        />
      </div>
    </div>
  );
}
