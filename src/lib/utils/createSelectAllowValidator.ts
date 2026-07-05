import { AppointmentEvent } from "@/common/types/AppointmentEvent";
import { DateSelectArg, DateSpanApi } from "@fullcalendar/core";
import { EventImpl } from "@fullcalendar/core/internal";

/**
 * Higher-order function that generates a FullCalendar selectAllow constraint.
 * It prevents selecting time ranges that overlap with existing appointments.
 */
export const createSelectAllowValidator = (appointments: AppointmentEvent[]) => {
  return (span: DateSpanApi, movingEvent: EventImpl | null): boolean => {
    const selectionStartStr = span.startStr;
    const selectionEndStr = span.endStr;

    const isOverlapping = appointments.some((appointment) => {
      const eventStart = new Date(appointment.start).toISOString();
      const eventEnd = new Date(appointment.end).toISOString();

      const selectionStartISO = new Date(selectionStartStr).toISOString();
      const selectionEndISO = new Date(selectionEndStr).toISOString();

      return selectionStartISO < eventEnd && selectionEndISO > eventStart;
    });

    return !isOverlapping;
  };
};
