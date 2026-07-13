import { AppointmentEvent } from "@/common/types/AppointmentEvent";

import {
  createContext,
} from "react";

interface AppointmentContextType {
  appointments: AppointmentEvent[];
  loading: boolean;
  addAppointment: (newAppointment: AppointmentEvent) => void;
  removeAppointment: (id: string) => Promise<void>;
  isRemovingAppointment: boolean;
}

export const AppointmentContext = createContext<AppointmentContextType | null>(
  null,
);


