"use client";

import React, { useMemo, useRef } from "react";
import { useAppointments } from "@/hooks/useAppointments";
import { useCalendar } from "@/hooks/useCalendar";

import { createSelectAllowValidator } from "@/lib/utils/createSelectAllowValidator";
import { DEFAULT_APP_TIMEZONE } from "@/common/constants/timezone";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg } from "@fullcalendar/core/index.js";

import CreateAppointmentModal from "./create-appointment/CreateAppointmentModal";
import AppointmentPopoverCard from "./view-appointment/AppointmentPopoverCard";
import CalendarSkeleton from "./CalendarSkeleton";

interface AppointmentCalendarProps {
  clinicId: string;
}

export default function Calendar({ clinicId }: AppointmentCalendarProps) {
  const { appointments, loading: isLoading, error } = useAppointments();

  const {
    currentView,
    handleTimeSlotSelect,
    handleDatesSet,
    showCreateAppointment,
    closeCreateAppointment,
    handleEventClick,
  } = useCalendar();

  const calendarRef = useRef<FullCalendar>(null);

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
    <div className="relative w-full h-full flex flex-col overflow-hidden p-4 box-border">
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-white p-4">
          <CalendarSkeleton view={currentView.type} />
        </div>
      )}
      <div className="flex-1 w-full min-h-0">
        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            multiMonthPlugin,
            interactionPlugin,
          ]}
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
          initialView="timeGridDay"
          height="100%"
          timeZone={DEFAULT_APP_TIMEZONE}
          weekends={true}
          slotMinTime="08:00:00"
          slotMaxTime="16:30:00"
          slotDuration="00:15:00"
          allDaySlot={false}
          handleWindowResize={true}
          nowIndicator={true}
          scrollTime={currentTimeOneHourAgoFormatted}
          scrollTimeReset={false}
          selectable={true}
          select={(selectInfo: DateSelectArg) =>
            handleTimeSlotSelect(selectInfo)
          }
          datesSet={handleDatesSet}
          events={appointments}
          // avoid overlapping
          eventOverlap={false}
          selectAllow={createSelectAllowValidator(appointments)}
          // visualize events
          eventClick={handleEventClick}
        />
        <CreateAppointmentModal
          isOpen={showCreateAppointment}
          onClose={closeCreateAppointment}
          clinicId={clinicId}
        />
        <AppointmentPopoverCard />
      </div>
    </div>
  );
}
