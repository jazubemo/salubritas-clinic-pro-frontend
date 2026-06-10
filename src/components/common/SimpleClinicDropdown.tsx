"use client";

import ActiveClinicIndicator from "./navbar/ActiveClinicIndicator";

export interface ClinicOption {
  clinicId: string;
  clinicName: string;
}

interface ClinicDropdownProps {
  options: ClinicOption[];
  currentClinicId: string;
  onChange: (id: string) => void;
}

export default function SimpleClinicDropdown({
  options,
  currentClinicId,
  onChange,
}: ClinicDropdownProps) {
  const currentClinic = options?.find(
    (option) => option.clinicId === currentClinicId,
  );

  return (
    <div className="relative group cursor-pointer">
      <ActiveClinicIndicator clinicName={currentClinic?.clinicName} showArrow />

      <select
        value={currentClinicId}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        aria-label="Select Active Clinic"
      >
        {options?.map((option) => (
          <option
            key={option.clinicId}
            value={option.clinicId}
            className="bg-slate-900 text-white font-sans text-sm"
          >
            {option.clinicName}
          </option>
        ))}
      </select>
    </div>
  );
}
