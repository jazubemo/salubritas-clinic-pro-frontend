"use client";

import React, { useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";

import { DateSelectArg } from "@fullcalendar/core/index.js";
import { useAppointments } from "@/hooks/useAppointments";
import { DEFAULT_APP_TIMEZONE } from "@/common/constants/timezone";
import CalendarSkeleton from "./CalendarSkeleton";
import { CalendarViewType } from "./interfaces/CalendarViewType";
import CreateAppointmentModal from "./create-appointment/CreateAppointmentModal";
import { useDoctors } from "@/hooks/useDoctors";
import DoctorFilterDropdown from "../doctor/DoctorScheduleFilter ";

interface AppointmentCalendarProps {
  clinicId: string;
}

const CALENDAR_VIEW_MAP: Record<string, CalendarViewType> = {
  multiMonthYear: "year",
  dayGridMonth: "month",
  timeGridWeek: "week",
  timeGridDay: "day",
};

export default function Calendar({ clinicId }: AppointmentCalendarProps) {
  const {
    appointments,
    loading: isLoading,
    error,
    handleSelect,
    setCurrentView,
    currentView,
    isModalOpen,
    onClose,
  } = useAppointments();

  const { loading: loadingDoctors } = useDoctors();

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

  const handleDatesSet = (arg: any) => {
    const viewStart = arg.view.calendar.formatIso(arg.view.currentStart);
    const viewEnd = arg.view.calendar.formatIso(arg.view.currentEnd);

    const fullCalendarViewType = arg.view.type;
    const simplifiedView = CALENDAR_VIEW_MAP[fullCalendarViewType] || "day";

    setCurrentView({
      start: viewStart,
      end: viewEnd,
      type: simplifiedView,
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden p-4 box-border">
      {isLoading || loadingDoctors && (
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
          select={(selectInfo: DateSelectArg) => handleSelect(selectInfo)}
          datesSet={handleDatesSet}
        />
        <CreateAppointmentModal
          isOpen={isModalOpen}
          onClose={onClose}
          clinicId={clinicId}
        />
      </div>
    </div>
  );
}
