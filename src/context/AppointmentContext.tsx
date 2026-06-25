import { Appointment } from "@/__generated__/graphql";
import { ONE_HOUR_IN_MILLISECONDS } from "@/common/constants/time";
import { formatToAppTimezone } from "@/common/timezone/formatToAppTimezone";
import { AppointmentEvent } from "@/common/types/AppointmentEvent";
import { AppointmentsQuery } from "@/graphql/queries/findAppointments";
import { useLazyQuery } from "@apollo/client/react";
import { DateSelectArg } from "@fullcalendar/core/index.js";

import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface AppointmentContextType {
  appointments: AppointmentEvent[];
  loading: boolean;
  setAppointments: Dispatch<SetStateAction<AppointmentEvent[]>>;
  handleSelect: (selectInfo: DateSelectArg) => void;
}

export const AppointmentContext = createContext<AppointmentContextType | null>(
  null,
);

interface AppointmentProviderProps {
  children: ReactNode;
  clinicId: string;
}

export function AppointmentProvider({ children, clinicId }: AppointmentProviderProps) {
  const confirmedAppointmentColor = "#0B8043";
  const pendingAppointmentColor = "#617480";

  const [appointments, setAppointments] = useState<AppointmentEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const [getAppointments, { loading: loadingAppointments, error }] =
    useLazyQuery(AppointmentsQuery);

  const transformToAppointmentEvents = (
    appointments: Appointment[],
  ): AppointmentEvent[] => {
    return appointments.map((appointment) => ({
      id: appointment._id,
      title: appointment.patientName,
      start: formatToAppTimezone(appointment.startTime),
      end: formatToAppTimezone(appointment.endTime),
      backgroundColor: appointment.status === "PENDING" ? pendingAppointmentColor : confirmedAppointmentColor,
      ...appointment,
    }));
  };

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      //if (!activeClinicId || !startRange || !endRange) return; // Guard clause

      try {
        const result = await getAppointments({
          variables: {
            activeClinicId: clinicId,
            startRange: "2026-06-25T00:00:00.000",
            endRange: "2026-06-25T23:59:59.999",
          },
        });
        console.log('result', result);

        if (result.data?.appointments) {
          setAppointments(
            transformToAppointmentEvents(result.data.appointments),
          );
          setLoading(false);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error("Failed to fetch appointments:", err);
      }
    }

    fetchAppointments();
  }, []);

  const handleSelect = (selectInfo: DateSelectArg) => {
    const durationInMinutes =
      selectInfo.end.getTime() - selectInfo.start.getTime();
    const durationInHours = durationInMinutes / ONE_HOUR_IN_MILLISECONDS;

    // 2. Enforce the 1-hour maximum clinic rule
    if (durationInHours > 1) {
      alert("Clinic rules limit appointments to a maximum of 1 hour.");
      selectInfo.view.calendar.unselect();
      return;
    }

    const patientName = prompt("Enter Patient Name:");
    selectInfo.view.calendar.unselect();

    if (patientName) {
      const newAppointment: AppointmentEvent = {
        id: crypto.randomUUID(),
        _id: crypto.randomUUID(),
        title: patientName,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        clinicId: clinicId,
        startTime: selectInfo.startStr, // e.g., "2026-06-21T10:00:00"
        endTime: selectInfo.endStr, // e.g., "2026-06-21T11:00:00"
        status: "PENDING",
        isNewPatient: false,
        reason: "Routine Checkup",
        patientId: "6a30562acbc138294d977b46",
        patientName: "Henry Altman",
        doctorId: "6a3054facbc138294d977b30",
        doctorName: "Miranda Bailey",
        backgroundColor: confirmedAppointmentColor,
      };

      setAppointments((prev) => [...prev, newAppointment]);
    }
  };

  return (
    <AppointmentContext
      value={{ appointments, loading, setAppointments, handleSelect }}
    >
      {children}
    </AppointmentContext>
  );
}
