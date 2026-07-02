import { Appointment } from "@/__generated__/graphql";
import { formatToAppTimezone } from "@/common/timezone/formatToAppTimezone";
import { AppointmentEvent } from "@/common/types/AppointmentEvent";
import { AppointmentsQuery } from "@/graphql/queries/findAppointments";
import { useLazyQuery } from "@apollo/client/react";

import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
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
  setAppointments: Dispatch<SetStateAction<AppointmentEvent[]>>;
}

export const AppointmentContext = createContext<AppointmentContextType | null>(
  null,
);

interface AppointmentProviderProps {
  children: ReactNode;
  clinicId: string;
}

export function AppointmentProvider({
  children,
  clinicId,
}: AppointmentProviderProps) {
  const confirmedAppointmentColor = "#0B8043";
  const pendingAppointmentColor = "#617480";

  const [appointments, setAppointments] = useState<AppointmentEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const currentClinic = useSelector((state) =>
    selectClinicByParamsId(state, clinicId),
  );
  const { user } = useAppSelector((state) => state.auth);

  //calendar
   const { currentView, setCurrentView, isModalOpen, onClose } = useCalendar();

  const { selectedDoctor } = useDoctors();


  const [getAppointments] = useLazyQuery(AppointmentsQuery);

  const transformToAppointmentEvents = (
    appointments: Appointment[],
  ): AppointmentEvent[] => {
    return appointments.map((appointment) => ({
      id: appointment._id,
      title: appointment.patientName,
      start: formatToAppTimezone(appointment.startTime),
      end: formatToAppTimezone(appointment.endTime),
      backgroundColor:
        appointment.status === "PENDING"
          ? pendingAppointmentColor
          : confirmedAppointmentColor,
      ...appointment,
    }));
  };

  const getFindAppointmentsVariables = (
    startRange: string,
    endRange: string,
  ) => {
    const { roles } = currentClinic;

    return {
      activeClinicId: clinicId,
      startRange,
      endRange,
      ...(roles.includes("PATIENT") && { patientId: user?._id }),
      ...(roles.includes("DOCTOR") && { doctorId: user?._id }),
      ...(roles.includes("ADMIN") && { doctorId: selectedDoctor?.userId }),
    };
  };

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      const { start: startRange, end: endRange } = currentView;

      if (!clinicId || !startRange || !endRange) return; // Guard clause

      try {
        const result = await getAppointments({
          variables: getFindAppointmentsVariables(startRange, endRange),
        });

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
  }, [currentView, clinicId, selectedDoctor]);

  return (
    <AppointmentContext
      value={{
        appointments,
        loading,
        setAppointments,
      }}
    >
      {children}
    </AppointmentContext>
  );
}
