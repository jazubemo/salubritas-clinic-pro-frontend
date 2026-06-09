import { RootState } from "@/lib/store";

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectClinicByParamsId = (state: RootState, clinicId: string | undefined) => {
  if (!clinicId) return null;
  
  const availableClinics = state.auth.user?.clinicMemberships || [];
  return availableClinics.find((membership) => membership.clinicId === clinicId) || null;
};

export const selectActiveClinics = (state: RootState) => {
  return state.auth.user?.clinicMemberships || [];
};
