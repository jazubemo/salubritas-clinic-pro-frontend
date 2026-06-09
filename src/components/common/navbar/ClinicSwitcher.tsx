import { Building2 } from "lucide-react";

import SimpleClinicDropdown from "../SimpleClinicDropdown";
import { ClinicMembership } from "@/__generated__/graphql";

interface ClinicSwitcherProps {
  currentClinic: ClinicMembership | undefined;
  clinics: ClinicMembership[];
}

const ClinicSwitcher = ({ currentClinic, clinics }: ClinicSwitcherProps) => {
  const clinicOptions = clinics.map((clinic) => ({
    clinicId: clinic.clinicId,
    clinicName: clinic.name,
  }));

  return (
    <>
      {clinics.length > 1 ? (
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
        <div className="flex items-center gap-2 border-r border-white/10 pr-6 text-white">
          <Building2 className="h-5 w-5 text-cyan-400" />
          <div className="flex flex-col">
            <span className="text-xs text-white/50 font-medium uppercase tracking-wider">
              Active Clinic
            </span>
            <span className="text-sm font-semibold">
              {currentClinic?.name || "Unknown"}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ClinicSwitcher;
