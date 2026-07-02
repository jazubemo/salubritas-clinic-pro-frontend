import { useDoctors } from "@/hooks/useDoctors";
import React, { useState } from "react";

export default function DoctorScheduleFilter() {
  const [isOpen, setIsOpen] = useState(false);

   const { doctors: availableDoctors, setSelectedDoctor, selectedDoctor } = useDoctors();

  const handleOnDoctorChange = (doctor) => {
    setSelectedDoctor(doctor);
    setIsOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pt-2 pb-6 mb-2 border-b border-gray-100 bg-transparent">
      <label className="block text-xs font-extrabold uppercase tracking-[0.2em] text-white mb-2.5 text-left">
        Viewing Schedule For
      </label>

      <div className="relative inline-block z-30 text-left mx-auto">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-4 px-7 py-4 rounded-2xl border-2 border-gray-200/90 bg-white hover:bg-slate-50 transition-all duration-200 shadow-md min-w-[320px] justify-center focus:outline-none focus:ring-4 focus:ring-cyan-500/10"
        >
          <div className="flex items-center gap-3.5 justify-center">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
            </span>

            <span className="text-xl font-black text-gray-800 tracking-tight">
              {selectedDoctor?.fullName}
            </span>
          </div>

          <svg
            className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-[360px] rounded-2xl bg-white border-2 border-gray-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] z-20 overflow-hidden py-2">
              {availableDoctors.map((doctor) => (
                <button
                  key={doctor.userId}
                  onClick={() => handleOnDoctorChange(doctor)}
                  className={`w-full text-center px-6 py-3.5 text-base transition-colors flex flex-col items-center justify-center gap-1 ${
                    selectedDoctor?.userId === doctor.userId
                      ? "bg-cyan-50 text-cyan-800 font-extrabold"
                      : "text-gray-700 hover:bg-slate-50 font-semibold"
                  }`}
                >
                  <span className="text-base">{doctor.fullName}</span>
                  <span
                    className={`text-xs uppercase tracking-wider font-bold ${selectedDoctor?.userId === doctor.userId ? "text-cyan-600" : "text-gray-400"}`}
                  >
                    {doctor.specialty}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
