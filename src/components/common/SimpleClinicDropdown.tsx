'use client';

import { Building2 } from 'lucide-react';

export interface ClinicOption {
  clinicId: string;
  clinicName: string;
}

interface ClinicDropdownProps {
  options: ClinicOption[];
  currentClinicId: string;
  onChange: (id: string) => void;
}

export default function SimpleClinicDropdown({ options, currentClinicId, onChange }: ClinicDropdownProps) {
  const currentClinic = options?.find((option) => option.clinicId === currentClinicId);

  return (
    <div className="relative group cursor-pointer">
      
      <div className="flex items-center gap-2 border-r border-white/10 pr-6 text-white transition group-hover:opacity-80">
        <Building2 className="h-5 w-5 text-cyan-400" />
        <div className="flex flex-col">
          <span className="text-[10px] text-white/50 font-medium uppercase tracking-wider">
            Active Clinic
          </span>
          <span className="text-sm font-semibold flex items-center gap-1.5">
            {currentClinic?.clinicName || "Unknown"}
            <span className="text-[10px] text-white/30 group-hover:text-cyan-400 transition-colors">▼</span>
          </span>
        </div>
      </div>

      <select
        value={currentClinicId}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
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

