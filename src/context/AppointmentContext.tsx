import { Appointment } from "@/__generated__/graphql";
import { formatToAppTimezone } from "@/common/timezone/formatToAppTimezone";
import { AppointmentEvent } from "@/common/types/AppointmentEvent";
import { AppointmentsQuery } from "@/graphql/queries/appointments";
import { useLazyQuery } from "@apollo/client/react";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { selectClinicByParamsId } from "@/lib/features/auth/authSelectors";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/lib/store";
import { useDoctors } from "@/hooks/useDoctors";
import { useCalendar } from "@/hooks/useCalendar";

interface AppointmentContextType {
  appointments: AppointmentEvent[];
  loading: boolean;
  addAppointment: (newAppointment: AppointmentEvent) => void;
}

export const AppointmentContext = createContext<AppointmentContextType | null>(
  null,
);


