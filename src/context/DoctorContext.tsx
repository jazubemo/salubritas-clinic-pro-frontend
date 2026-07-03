import {
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

interface DoctorContextType {
  doctors: Doctor[];
  loading: boolean;
  selectedDoctor: Doctor | undefined;
  setSelectedDoctor: Dispatch<SetStateAction<Doctor | undefined>>;
}

export const DoctorContext = createContext<DoctorContextType | null>(null);

//FIXME: move this interface to its own file
export interface Doctor {
  userId: string;
  fullName: string;
  specialty: string;
}
