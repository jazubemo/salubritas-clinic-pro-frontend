'use client';

// Note: If you don't use Lucide icons, replace <Building2 /> with your SVG building icon
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
  // Locate the active clinic object to fetch its string name for the template layer
  const currentClinic = options?.find((o) => o.clinicId === currentClinicId);

  return (
    /* relative container allows us to stack the native dropdown invisible layer right on top */
    <div className="relative group cursor-pointer">
      
      {/* 🎨 VISUAL LAYER: Exactly your desired look */}
      <div className="flex items-center gap-2 border-r border-white/10 pr-6 text-white transition group-hover:opacity-80">
        <Building2 className="h-5 w-5 text-cyan-400" />
        <div className="flex flex-col">
          <span className="text-[10px] text-white/50 font-medium uppercase tracking-wider">
            Active Clinic
          </span>
          <span className="text-sm font-semibold flex items-center gap-1.5">
            {currentClinic?.clinicName || "Unknown"}
            {/* Minimal downward triangle chevron indicator */}
            <span className="text-[10px] text-white/30 group-hover:text-cyan-400 transition-colors">▼</span>
          </span>
        </div>
      </div>

      {/* 🔮 CLICKABLE LAYER: Absolute overlay hidden from sight but fully active */}
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

