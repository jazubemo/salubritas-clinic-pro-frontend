import { AppointmentContext } from "@/context/AppointmentContext";
import { useContext } from "react";

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
}