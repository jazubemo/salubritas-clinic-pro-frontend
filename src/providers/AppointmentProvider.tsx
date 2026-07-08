import { Appointment } from "@/__generated__/graphql";
import { formatToAppTimezone } from "@/common/timezone/formatToAppTimezone";
import { AppointmentEvent } from "@/common/types/AppointmentEvent";
import { AppointmentsQuery } from "@/graphql/queries/appointments";
import { useLazyQuery } from "@apollo/client/react";

import { useState, useEffect, ReactNode } from "react";
import { selectClinicByParamsId } from "@/lib/features/auth/authSelectors";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/lib/store";
import { useDoctors } from "@/hooks/useDoctors";
import { useCalendar } from "@/hooks/useCalendar";
import { AppointmentContext } from "@/context/AppointmentContext";

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
  const { currentView } = useCalendar();
  const { selectedDoctor } = useDoctors();

  const [triggerFetchAppointmentsQuery] = useLazyQuery(AppointmentsQuery);

  const mapAppointmentToEvent = (appointment: Appointment) => {
    return {
      id: appointment._id,
      title: appointment.patientName,
      start: formatToAppTimezone(appointment.startTime),
      end: formatToAppTimezone(appointment.endTime),
      backgroundColor:
        appointment.status === "PENDING"
          ? pendingAppointmentColor
          : confirmedAppointmentColor,
      overlap: false,
      ...appointment,
    };
  };

  const mapAppointmentsToEvents = (
    appointments: Appointment[],
  ): AppointmentEvent[] => {
    return appointments.map((appointment) =>
      mapAppointmentToEvent(appointment),
    );
  };

  const buildQueryVariables = (startRange: string, endRange: string) => {
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
    let isMounted = true;

    async function fetchAppointments() {
      setLoading(true);
      const { start: startRange, end: endRange } = currentView;

      if (!clinicId || !startRange || !endRange) return; // Guard clause

      try {
        const result = await triggerFetchAppointmentsQuery({
          variables: buildQueryVariables(startRange, endRange),
        });

        if (isMounted && result.data?.appointments) {
          setAppointments(mapAppointmentsToEvents(result.data.appointments));
          if (isMounted) setLoading(false);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error("Failed to fetch appointments:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();

    return () => {
      isMounted = false;
    };
  }, [currentView, clinicId, selectedDoctor]);

  const addAppointment = (newAppointment: AppointmentEvent) => {
    setAppointments((prevAppointments) => [
      ...prevAppointments,
      mapAppointmentToEvent(newAppointment),
    ]);
  };

  return (
    <AppointmentContext
      value={{
        appointments,
        loading,
        addAppointment,
      }}
    >
      {children}
    </AppointmentContext>
  );
}
