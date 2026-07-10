import { AppointmentEvent } from "@/common/types/AppointmentEvent";
import { ActiveViewRange } from "@/components/appointment/interfaces/ActiveViewRange";

import {
  DateSelectArg,
  DatesSetArg,
  EventClickArg,
} from "@fullcalendar/core/index.js";

import { createContext, Dispatch, SetStateAction } from "react";

export interface AppointmentTime {
  start: {
    human: string;
    timestamp: string;
  };
  end: {
    human: string;
    timestamp: string;
  };
}

interface CalendarContextType {
  handleTimeSlotSelect: (selectInfo: DateSelectArg) => void;
  setCurrentView: Dispatch<SetStateAction<ActiveViewRange>>;
  currentView: ActiveViewRange;
  showCreateAppointment: boolean;
  closeCreateAppointment: () => void;
  selectedTime: AppointmentTime | undefined;
  handleDatesSet: (arg: DatesSetArg) => void;
  handleEventClick: (clickInfo: EventClickArg) => void;
  selectedEvent: AppointmentEvent | null;
  closePopover: () => void;
  popoverPosition: {
    top: number;
    left: number;
  } | null;
}

export const CalendarContext = createContext<CalendarContextType | null>(null);
