
import { DoctorContext } from "@/context/DoctorContext";
import { useContext } from "react";

export function useDoctors() {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctors must be used within an DoctorProvider');
  }
  return context;
}