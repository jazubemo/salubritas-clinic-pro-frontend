import { Specialty, User } from "@/__generated__/graphql";
import { DOCTORS_QUERY } from "@/graphql/queries/doctors";
import { selectClinicByParamsId } from "@/lib/features/auth/authSelectors";
import { useLazyQuery } from "@apollo/client/react";

import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface DoctorContextType {
  doctors: Doctor[];
  loading: boolean;
  selectedDoctor: Doctor | undefined;
  setSelectedDoctor: Dispatch<SetStateAction<Doctor | undefined>>;
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
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();

  const currentClinic = useSelector((state) =>
    selectClinicByParamsId(state, clinicId),
  );

  const [triggerFetchDoctorsQuery] = useLazyQuery(DOCTORS_QUERY, {
    fetchPolicy: "network-only",
  });

  const mapToDoctorList = (users: Partial<User[]>): Doctor[] => {
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

      if (!clinicId || !currentClinic?.roles.includes("ADMIN")) return; // Guard clause

      try {
        const result = await triggerFetchDoctorsQuery({
          variables: {
            activeClinicId: clinicId,
          },
        });

        if (result.data?.doctors) {
          const doctorList = mapToDoctorList(result.data?.doctors);

          if (doctorList.length > 0) {
            setDoctors(doctorList);
            setSelectedDoctor(doctorList[0]);
          }
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
        selectedDoctor,
        setSelectedDoctor,
      }}
    >
      {children}
    </DoctorContext>
  );
}
