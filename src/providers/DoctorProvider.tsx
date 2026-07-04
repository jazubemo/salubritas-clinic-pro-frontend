import { Specialty, User } from "@/__generated__/graphql";
import { Doctor, DoctorContext } from "@/context/DoctorContext";
import { DOCTORS_QUERY } from "@/graphql/queries/doctors";
import { useQuery } from "@apollo/client/react";

import { useState, ReactNode, useMemo } from "react";

const DOCTOR_SPECIALTY_MAP: Record<Specialty, string> = {
  CARDIOTHORACIC_SURGERY: "Cardiothoracic Surgery",
  GENERAL_SURGERY: "General Surgery",
  INTERNAL_MEDICINE: "Internal Medicine",
  PEDIATRIC: "Pediatric",
};

interface DoctorProviderProps {
  children: ReactNode;
  clinicId: string;
}

export function DoctorProvider({ children, clinicId }: DoctorProviderProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();

  const { loading, error, data } = useQuery(DOCTORS_QUERY, {
    variables: { activeClinicId: clinicId },
    skip: !clinicId,
  });

  const doctorsList = useMemo(() => {
    const users = data?.doctors as User[];
    if (!users) return [];

    return users.map((user) => ({
      userId: user?._id,
      fullName: `Dr. ${user?.firstName} ${user?.lastName}`,
      specialty: user?.doctorProfile?.specialty
        ? DOCTOR_SPECIALTY_MAP[user?.doctorProfile?.specialty]
        : "General Physician",
    })) as Doctor[];
  }, [data?.doctors]);

  const currentSelectedDoctor = useMemo(() => {
    return selectedDoctor || doctorsList[0];
  }, [selectedDoctor, doctorsList]);


  const contextValue = useMemo(() => ({
    doctors: doctorsList,
    loading,
    selectedDoctor: currentSelectedDoctor,
    setSelectedDoctor,
  }), [doctorsList, loading, currentSelectedDoctor]);

  return (
    <DoctorContext value={contextValue}>
      {children}
    </DoctorContext>
  );
}

