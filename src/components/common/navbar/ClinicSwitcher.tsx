import SimpleClinicDropdown from "../SimpleClinicDropdown";
import {
  selectActiveClinics,
  selectClinicByParamsId,
} from "@/lib/features/auth/authSelectors";
import { useAppSelector } from "@/lib/store";
import ActiveClinicIndicator from "./ActiveClinicIndicator";

interface ClinicSwitcherProps {
  currentClinicId: string;
}

const ClinicSwitcher = ({ currentClinicId }: ClinicSwitcherProps) => {
  const activeClinics = useAppSelector((state) => selectActiveClinics(state));

  const currentClinic = useAppSelector((state) =>
    selectClinicByParamsId(state, currentClinicId),
  );

  const clinicOptions = activeClinics.map((clinic) => ({
    clinicId: clinic.clinicId,
    clinicName: clinic.name,
  }));

  return (
    <>
      {activeClinics.length > 1 ? (
        <SimpleClinicDropdown
          options={clinicOptions}
          currentClinicId={currentClinic?.clinicId || ""}
          onChange={(nextClinicId: string) =>
            window.open(
              `/clinic/${nextClinicId}/appointments`,
              "_blank",
              "noopener,noreferrer",
            )
          }
        />
      ) : (
        <ActiveClinicIndicator clinicName={currentClinic?.name} />
      )}
    </>
  );
};

export default ClinicSwitcher;
