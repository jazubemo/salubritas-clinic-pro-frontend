import { ONE_HOUR_IN_MILLISECONDS } from "@/common/constants/time";
import { DEFAULT_APP_TIMEZONE } from "@/common/constants/timezone";
import { ActiveViewRange } from "@/components/appointment/interfaces/ActiveViewRange";
import { CalendarViewType } from "@/components/appointment/interfaces/CalendarViewType";
import { AppointmentTime, CalendarContext } from "@/context/CalendarContext";

import { DateSelectArg } from "@fullcalendar/core/index.js";
import { DateTime } from "luxon";

import {
  useState,
  ReactNode,
} from "react";
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

  const [showCreateAppointment, setShowCreateAppointment ] = useState(false);

  const [selectedTime, setSelectedTime] = useState<AppointmentTime>();

  const closeCreateAppointment = () => {
    setShowCreateAppointment (false);
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
        timestamp: rawStart
      },
      end: {
        human: exactEndTime,
        timestamp: rawEnd,
      }
    });
    setShowCreateAppointment (true);
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
        handleDatesSet
      }}
    >
      {children}
    </CalendarContext>
  );
}