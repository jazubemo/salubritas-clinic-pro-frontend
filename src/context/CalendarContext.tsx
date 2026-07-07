import { ActiveViewRange } from "@/components/appointment/interfaces/ActiveViewRange";

import { DateSelectArg, DatesSetArg } from "@fullcalendar/core/index.js";

import {
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

export interface AppointmentTime {
  start: {
    human: string;
    timestamp: string;
  };
  end: {
    human: string;
    timestamp: string;
  }
}

interface CalendarContextType {
  handleTimeSlotSelect: (selectInfo: DateSelectArg) => void;
  setCurrentView: Dispatch<SetStateAction<ActiveViewRange>>;
  currentView: ActiveViewRange;
  showCreateAppointment: boolean;
  closeCreateAppointment: () => void;
  selectedTime: AppointmentTime | undefined;
  handleDatesSet: (arg: DatesSetArg) => void
}

export const CalendarContext = createContext<CalendarContextType | null>(null);