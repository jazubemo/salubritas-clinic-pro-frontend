import { CalendarContext } from "@/context/CalendarContext";
import { useContext } from "react";

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within an CalendarProvider');
  }
  return context;
}