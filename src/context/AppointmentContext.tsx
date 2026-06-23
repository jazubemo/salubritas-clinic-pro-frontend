import { ONE_HOUR_IN_MILLISECONDS } from '@/common/constants/time';
import { AppointmentEvent } from '@/common/types/AppointmentEvent';
import { AppointmentsQuery } from '@/graphql/queries/findAppointments';
import { useLazyQuery } from '@apollo/client/react';
import { DateSelectArg } from '@fullcalendar/core/index.js';
import { createContext, useState, useEffect, Dispatch, SetStateAction, ReactNode } from 'react';

interface AppointmentContextType {
  appointments: AppointmentEvent[];
  loading: boolean;
  setAppointments: Dispatch<SetStateAction<AppointmentEvent[]>>;
}

export const AppointmentContext = createContext<AppointmentContextType | null>(null);

interface AppointmentProviderProps {
  children: ReactNode;
}

export function AppointmentProvider({ children }: AppointmentProviderProps) {
  const [appointments, setAppointments] = useState<AppointmentEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const [getAppointments, { loading: loadingAppointments, error }] = useLazyQuery(AppointmentsQuery);

  useEffect(() => {
    async function fetchAppointments() {
      //if (!activeClinicId || !startRange || !endRange) return; // Guard clause

      try {
        const result = await getAppointments({
          variables: {
            activeClinicId: "6a19b5271f1ed3c15e0936d7",
            startRange: "2026-06-23T00:00:00.000",
            endRange: "2026-06-23T23:59:59.999",
          },
        });

        if (result.data?.appointments) {
          setAppointments(result.data.appointments);
        }
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      } finally {
        setLoading(false);
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
  
      const confirmedAppointmentColor = "#0B8043";
      const pendingAppointmentColor = "#617480"
  
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
    console.log("appointments", appointments);

  return (
    <AppointmentContext value={{ appointments, loading, setAppointments }}>
      {children}
    </AppointmentContext>
  );
}


