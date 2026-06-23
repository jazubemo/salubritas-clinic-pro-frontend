import { AppointmentEvent } from '@/common/types/AppointmentEvent';
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

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch('/api/appointments');
        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, []);

  return (
    <AppointmentContext value={{ appointments, loading, setAppointments }}>
      {children}
    </AppointmentContext>
  );
}


