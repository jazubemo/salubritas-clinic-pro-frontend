import { ONE_HOUR_IN_MILLISECONDS } from "@/common/constants/time";
import { DEFAULT_APP_TIMEZONE } from "@/common/constants/timezone";
import { AppointmentEvent } from "@/common/types/AppointmentEvent";
import { ActiveViewRange } from "@/components/appointment/interfaces/ActiveViewRange";
import { CalendarViewType } from "@/components/appointment/interfaces/CalendarViewType";
import { AppointmentTime, CalendarContext } from "@/context/CalendarContext";

import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import { DateTime } from "luxon";

import { useState, ReactNode } from "react";
import { toast } from "sonner";

interface CalendarProviderProps {
  children: ReactNode;
}

const CALENDAR_VIEW_MAP: Record<string, CalendarViewType> = {
  multiMonthYear: "year",
  dayGridMonth: "month",
  timeGridWeek: "week",
  timeGridDay: "day",
};

export function CalendarProvider({ children }: CalendarProviderProps) {
  const [currentView, setCurrentView] = useState<ActiveViewRange>(() => {
    const nowLocal = DateTime.now().setZone(DEFAULT_APP_TIMEZONE);

    return {
      start: nowLocal.startOf("day").toISODate() + "T00:00:00",
      end: nowLocal.endOf("day").toISODate() + "T23:59:59",
      type: "day",
    };
  });

  const [showCreateAppointment, setShowCreateAppointment] = useState(false);

  const [selectedTime, setSelectedTime] = useState<AppointmentTime>();

  const [selectedEvent, setSelectedEvent] = useState<AppointmentEvent | null>(
    null,
  );

  const [popoverPosition, setPopoverPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const closeCreateAppointment = () => {
    setShowCreateAppointment(false);
  };

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

    closePopover();
  };

  const handleTimeSlotSelect = (selectInfo: DateSelectArg) => {
    const durationInMinutes =
      selectInfo.end.getTime() - selectInfo.start.getTime();
    const durationInHours = durationInMinutes / ONE_HOUR_IN_MILLISECONDS;

    // Enforce the 1-hour maximum clinic rule
    if (durationInHours > 1) {
      toast.error("Invalid Duration", {
        description: "Please select a time slot of 1 hour or less.",
      });

      selectInfo.view.calendar.unselect();
      return;
    }

    const rawStart = selectInfo.startStr;
    const rawEnd = selectInfo.endStr;

    const exactStartTime = DateTime.fromISO(rawStart).toFormat("h:mm a"); // "4:00 PM"
    const exactEndTime = DateTime.fromISO(rawEnd).toFormat("h:mm a");

    setSelectedTime({
      start: {
        human: exactStartTime,
        timestamp: rawStart,
      },
      end: {
        human: exactEndTime,
        timestamp: rawEnd,
      },
    });
    setShowCreateAppointment(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log("handleEventClick");
    clickInfo.jsEvent.preventDefault();
    const props = clickInfo.event.extendedProps;

    setSelectedEvent({
      _id: clickInfo.event.id,
      id: clickInfo.event.id,
      title: props.title,
      clinicId: props.clinicId,
      start: props.start,
      end: props.end,
      patientId: props.patientId,
      patientName: props.patientName,
      doctorId: props.doctorId,
      isNewPatient: props.isNewPatient || false,
      doctorName: props.doctorName,
      startTime: clickInfo.event.start?.toISOString() || "",
      endTime: clickInfo.event.end?.toISOString() || "",
      status: props.status,
      reason: props.reason,
    });

    // Get mouse coordinates relative to the viewport window
    const mouseX = clickInfo.jsEvent.clientX;
    const mouseY = clickInfo.jsEvent.clientY;

    // Find the closest relative parent node box wrapper container boundary
    const calendarContainer = clickInfo.el.closest(".relative");
    const containerRect = calendarContainer?.getBoundingClientRect();

    if (containerRect) {
      // Calculate precise coordinates relative to your parent calendar container
      setPopoverPosition({
        top: mouseY - containerRect.top - 80, // Offset vertically to sit elegantly above/near the mouse click
        left: Math.min(
          mouseX - containerRect.left + 20,
          window.innerWidth - 360,
        ), // Offset slightly right
      });
    }
  };

  const closePopover = () => {
    setSelectedEvent(null);
  };

  return (
    <CalendarContext
      value={{
        handleTimeSlotSelect,
        setCurrentView,
        currentView,
        showCreateAppointment,
        closeCreateAppointment,
        selectedTime,
        handleDatesSet,
        handleEventClick,
        selectedEvent,
        closePopover,
        popoverPosition,
      }}
    >
      {children}
    </CalendarContext>
  );
}
