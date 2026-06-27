import { Appointment } from "@/__generated__/graphql";
import { ONE_HOUR_IN_MILLISECONDS } from "@/common/constants/time";
import { DEFAULT_APP_TIMEZONE } from "@/common/constants/timezone";
import { formatToAppTimezone } from "@/common/timezone/formatToAppTimezone";
import { AppointmentEvent } from "@/common/types/AppointmentEvent";
import { CalendarViewType } from "@/components/appointment/interfaces/CalendarViewType";
import { ActiveViewRange } from "@/components/appointment/interfaces/ActiveViewRange";
import { AppointmentsQuery } from "@/graphql/queries/findAppointments";
import { useLazyQuery } from "@apollo/client/react";
import { DateSelectArg } from "@fullcalendar/core/index.js";
import { DateTime } from "luxon";

import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { toast } from "sonner";

interface AppointmentContextType {
  appointments: AppointmentEvent[];
  loading: boolean;
  setAppointments: Dispatch<SetStateAction<AppointmentEvent[]>>;
  handleSelect: (selectInfo: DateSelectArg) => void;
  setCurrentView: Dispatch<SetStateAction<ActiveViewRange>>;
  currentView: ActiveViewRange;
  isModalOpen: boolean;
  onClose: () => void;
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
  const [currentView, setCurrentView] = useState<ActiveViewRange>(() => {
    const nowLocal = DateTime.now().setZone(DEFAULT_APP_TIMEZONE);

    return {
      start: nowLocal.startOf("day").toISODate() + "T00:00:00",
      end: nowLocal.endOf("day").toISODate() + "T23:59:59",
      type: "day",
    };
  });

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => {
    setIsModalOpen(false);
  };
  console.log("currentView", currentView);

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

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      const { start: startRange, end: endRange } = currentView;

      if (!clinicId || !startRange || !endRange) return; // Guard clause

      try {
        const result = await getAppointments({
          variables: {
            activeClinicId: clinicId,
            startRange: startRange,
            endRange: endRange,
          },
        });
        console.log("result", result);

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
  }, [currentView, clinicId]);

  const handleSelect = (selectInfo: DateSelectArg) => {
    const durationInMinutes =
      selectInfo.end.getTime() - selectInfo.start.getTime();
    const durationInHours = durationInMinutes / ONE_HOUR_IN_MILLISECONDS;

    // Enforce the 1-hour maximum clinic rule
    if (durationInHours > 1) {
      toast.error("Invalid Duration", {
        description: "Please select a time slot of 1 hour or less.",
      });

      selectInfo.view.calendar.unselect();
      return;
    }

    setIsModalOpen(true);

    // if (patientName) {
    //   const newAppointment: AppointmentEvent = {
    //     id: crypto.randomUUID(),
    //     _id: crypto.randomUUID(),
    //     title: patientName,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     clinicId: clinicId,
    //     startTime: selectInfo.startStr, // e.g., "2026-06-21T10:00:00"
    //     endTime: selectInfo.endStr, // e.g., "2026-06-21T11:00:00"
    //     status: "PENDING",
    //     isNewPatient: false,
    //     reason: "Routine Checkup",
    //     patientId: "6a30562acbc138294d977b46",
    //     patientName: "Henry Altman",
    //     doctorId: "6a3054facbc138294d977b30",
    //     doctorName: "Miranda Bailey",
    //     backgroundColor: confirmedAppointmentColor,
    //   };

    //   setAppointments((prev) => [...prev, newAppointment]);
    // }
  };

  return (
    <AppointmentContext
      value={{
        appointments,
        loading,
        setAppointments,
        handleSelect,
        setCurrentView,
        currentView,
        isModalOpen,
        onClose,
      }}
    >
      {children}
    </AppointmentContext>
  );
}
