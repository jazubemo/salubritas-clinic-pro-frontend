"use client";

import LogoBadge from "./../common/AppLogo";

interface LoaderProps {
  message?: string;
  fullPage?: boolean;
}

export default function Loader({ message = "Verifying clinic credentials...", fullPage = true }: LoaderProps) {
  return (
    <div
      className={`flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-all duration-300 ${
        fullPage ? "fixed inset-0 z-50 h-screen w-screen" : "h-full w-full p-6"
      }`}
    >

      <div className="w-[450px] max-w-[90%] bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center text-center gap-6 border border-slate-100">
        
        <LogoBadge />

        <div className="relative my-2 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-100 border-t-indigo-600" />
        </div>


        {message && (
          <p className="text-sm font-medium text-slate-400 tracking-wide animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

