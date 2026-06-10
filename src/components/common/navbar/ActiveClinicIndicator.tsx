import { Building2, ChevronDown } from "lucide-react";

interface ActiveClinicIndicatorProps {
  clinicName: string | undefined;
  showArrow?: boolean;
}

const ActiveClinicIndicator = ({
  clinicName = "Unknown",
  showArrow = false,
}: ActiveClinicIndicatorProps) => {
  return (
    <div className="flex items-center gap-3 border-r border-white/10 pr-6 text-white transition-all h-9">
      <div className="h-8 w-8 rounded-lg bg-white/10 text-cyan-400 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
        <Building2 className="h-4 w-4" />
      </div>

      <div className="flex flex-col gap-0.5 justify-center">
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none">
          Active Clinic
        </span>
        <span className="text-sm font-semibold flex items-center gap-1.5 text-white/90 leading-none mt-[1px]">
          {clinicName}
          {showArrow && (
            <ChevronDown
              className={`h-3 w-3 opacity-50 text-white/60 transition-transform duration-200`}
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default ActiveClinicIndicator;
