import { ActiveViewRange } from "@/components/appointment/interfaces/ActiveViewRange";

import { DateSelectArg, DatesSetArg } from "@fullcalendar/core/index.js";

import {
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

interface CalendarContextType {
  handleTimeSlotSelect: (selectInfo: DateSelectArg) => void;
  setCurrentView: Dispatch<SetStateAction<ActiveViewRange>>;
  currentView: ActiveViewRange;
  showCreateAppointment: boolean;
  closeCreateAppointment: () => void;
  selectedStartTime: string;
  selectedEndTime: string;
  handleDatesSet: (arg: DatesSetArg) => void
}

export const CalendarContext = createContext<CalendarContextType | null>(null);