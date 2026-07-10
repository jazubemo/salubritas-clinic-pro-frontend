"use client";

import React, { useMemo, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";

import { DateSelectArg } from "@fullcalendar/core/index.js";
import { useAppointments } from "@/hooks/useAppointments";
import { DEFAULT_APP_TIMEZONE } from "@/common/constants/timezone";
import CalendarSkeleton from "./CalendarSkeleton";

import CreateAppointmentModal from "./create-appointment/CreateAppointmentModal";
import { useCalendar } from "@/hooks/useCalendar";
import { createSelectAllowValidator } from "@/lib/utils/createSelectAllowValidator";
import AppointmentPopoverCard from "./view-appointment/AppointmentPopoverCard";

interface AppointmentCalendarProps {
  clinicId: string;
}

export default function Calendar({ clinicId }: AppointmentCalendarProps) {
  const { appointments, loading: isLoading, error, removeAppointment } = useAppointments();

  const {
    currentView,
    handleTimeSlotSelect,
    handleDatesSet,
    showCreateAppointment,
    closeCreateAppointment,
    handleEventClick,
    selectedEvent,
    closePopover,
    popoverPosition,
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
          initialView="timeGridDay"
          height="100%"
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
          weekends={true}
          slotMinTime="08:00:00"
          slotMaxTime="16:30:00"
          handleWindowResize={true}
          slotDuration="00:15:00"
          allDaySlot={false}
          events={appointments}
          nowIndicator={true}
          scrollTime={currentTimeOneHourAgoFormatted}
          scrollTimeReset={false}
          timeZone={DEFAULT_APP_TIMEZONE}
          selectable={true}
          select={(selectInfo: DateSelectArg) =>
            handleTimeSlotSelect(selectInfo)
          }
          datesSet={handleDatesSet}
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
        {selectedEvent && popoverPosition && (
          <AppointmentPopoverCard
            selectedEvent={selectedEvent}
            onClose={closePopover}
            popoverPosition={popoverPosition}
            onRemove={removeAppointment}
          />
        )}
      </div>
    </div>
  );
}
