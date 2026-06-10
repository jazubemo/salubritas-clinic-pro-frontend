import { HeartPulse } from "lucide-react";

const NavBarLogo = () => {
  return (
    <div
      className="flex items-center gap-2 font-bold text-white text-lg tracking-wide hover:opacity-90 transition-opacity"
    >
      <div className="h-9 w-9 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 font-black">
        <HeartPulse
          className="w-5 h-5"
          strokeWidth={2.5}
          color="currentColor"
        />
      </div>
      <span className="leading-none">Salubritas Clinic Pro</span>
    </div>
  );
};

export default NavBarLogo;
