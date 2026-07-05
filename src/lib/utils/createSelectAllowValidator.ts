import { AppointmentEvent } from "@/common/types/AppointmentEvent";
import { DateSelectArg, DateSpanApi } from "@fullcalendar/core";
import { EventImpl } from "@fullcalendar/core/internal";

/**
 * Higher-order function that generates a FullCalendar selectAllow constraint.
 * It prevents selecting time ranges that overlap with existing appointments.
 */
export const createSelectAllowValidator = (appointments: AppointmentEvent[]) => {
  return (span: DateSpanApi, movingEvent: EventImpl | null): boolean => {
    if (!span.start || !span.end) return true;

    const selectionStart = span.start.getTime();
    const selectionEnd = span.end.getTime();
    
    const now = new Date();
    now.setSeconds(0, 0);
    const timeThreshold = now.getTime();

    // Block new selections if the target slot has already passed
    if (selectionStart < timeThreshold) {
      return false; 
    }

    const isOverlapping = appointments.some((appointment) => {
      const eventStart = new Date(appointment.start).toISOString();
      const eventEnd = new Date(appointment.end).toISOString();

      const selectionStartISO = new Date(selectionStart).toISOString();
      const selectionEndISO = new Date(selectionEnd).toISOString();

      return selectionStartISO < eventEnd && selectionEndISO > eventStart;
    });

    return !isOverlapping;
  };
};
