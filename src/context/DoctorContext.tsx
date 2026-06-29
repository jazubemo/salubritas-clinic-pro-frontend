import { Specialty, User } from "@/__generated__/graphql";
import { DOCTORS_QUERY } from "@/graphql/queries/doctors";
import { useLazyQuery } from "@apollo/client/react";

import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { toast } from "sonner";

interface DoctorContextType {
  doctors: Doctor[];
  loading: boolean;
}

export const DoctorContext = createContext<DoctorContextType | null>(null);

interface Doctor {
  userId: string;
  fullName: string;
  specialty: string;
}

interface DoctorProviderProps {
  children: ReactNode;
  clinicId: string;
}

const DOCTOR_SPECIALTY_MAP: Record<Specialty, string> = {
  CARDIOTHORACIC_SURGERY: "Cardiothoracic Surgery",
  GENERAL_SURGERY: "General Surgery",
  INTERNAL_MEDICINE: "Internal Medicine",
  PEDIATRIC: "Pediatric",
};

export function DoctorProvider({ children, clinicId }: DoctorProviderProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const [getDoctors] = useLazyQuery(DOCTORS_QUERY, {
    fetchPolicy: "network-only",
  });

  const transformToDoctorList = (users: Partial<User[]>): Doctor[] => {
    return users.map(
      (user) =>
        ({
          userId: user?._id,
          fullName: `Dr. ${user?.firstName} ${user?.lastName}`,
          specialty: user?.doctorProfile?.specialty
            ? DOCTOR_SPECIALTY_MAP[user?.doctorProfile?.specialty]
            : "General Physician",
        }) as Doctor,
    );
  };

  useEffect(() => {
    async function fetchDoctors() {
      setLoading(true);

      if (!clinicId) return; // Guard clause

      try {
        const result = await getDoctors({
          variables: {
            activeClinicId: clinicId,
          },
        });
        console.log("result", result);

        if (result.data?.doctors) {
          setDoctors(transformToDoctorList(result.data?.doctors));
          setLoading(false);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error("Failed to fetch appointments:", err);
      }
    }

    fetchDoctors();
  }, [clinicId]);

  return (
    <DoctorContext
      value={{
        doctors,
        loading,
      }}
    >
      {children}
    </DoctorContext>
  );
}
