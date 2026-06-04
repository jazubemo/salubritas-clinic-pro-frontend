import { HeartPulse } from "lucide-react";

interface AppLogoProps {
  header?: string;
}

export default function AppLogo({ header = "Salubritas Clinic Pro" }: AppLogoProps) {
  return (
    <div className="flex flex-col items-center gap-3 mb-6">
      <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-200">
        <HeartPulse
          className="w-8 h-8"
          strokeWidth={2.2}
          color="currentColor"
        />
      </div>
      <h1 className="text-center font-sans font-bold text-slate-800 tracking-tight">
        {header}
      </h1>
    </div>
  );
}
