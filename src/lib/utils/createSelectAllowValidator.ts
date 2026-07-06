import { DEFAULT_APP_TIMEZONE } from "@/common/constants/timezone";
import { AppointmentEvent } from "@/common/types/AppointmentEvent";
import { DateSpanApi } from "@fullcalendar/core";
import { EventImpl } from "@fullcalendar/core/internal";
import { DateTime } from "luxon";

/**
 * Higher-order function that generates a FullCalendar selectAllow constraint.
 * It prevents selecting time ranges that overlap with existing appointments.
 */
export const createSelectAllowValidator = (appointments: AppointmentEvent[]) => {
  return (span: DateSpanApi, movingEvent: EventImpl | null): boolean => {
    if (!span.startStr || !span.endStr) return true;

    const selectionStart = DateTime.fromISO(span.startStr, { zone: DEFAULT_APP_TIMEZONE });
    const selectionEnd = DateTime.fromISO(span.endStr, { zone: DEFAULT_APP_TIMEZONE });

    const systemNow = DateTime.now().setZone(DEFAULT_APP_TIMEZONE).set({ second: 0, millisecond: 0 });

    if (selectionStart < systemNow) {
      return false; 
    }

    const isOverlapping = appointments.some((appointment) => {
      const eventStart = appointment.start instanceof DateTime 
        ? appointment.start 
        : DateTime.fromISO(appointment.start as string, { zone: DEFAULT_APP_TIMEZONE });

      const eventEnd = appointment.end instanceof DateTime 
        ? appointment.end 
        : DateTime.fromISO(appointment.end as string, { zone: DEFAULT_APP_TIMEZONE });

      return selectionStart < eventEnd && selectionEnd > eventStart;
    });

    return !isOverlapping;
  };
};
