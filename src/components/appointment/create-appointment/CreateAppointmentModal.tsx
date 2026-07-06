"use client";

import { MINUTES_IN_AN_HOUR } from "@/common/constants/time";
import { useAppointments } from "@/hooks/useAppointments";
import { useCalendar } from "@/hooks/useCalendar";
import { useDoctors } from "@/hooks/useDoctors";
import { useSearchPatients } from "@/hooks/useSearchPatients";
import { CalendarPlus } from "lucide-react";
import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinicId: string;
}

const APPOINTMENT_STATUS_MAP = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
};

export default function CreateAppointmentModal({
  isOpen,
  onClose,
  clinicId,
}: ModalProps) {
  const [patientSearch, setPatientSearch] = useState<string>("");
  const [status, setStatus] = useState(APPOINTMENT_STATUS_MAP.PENDING);

  const { selectedStartTime, selectedEndTime } = useCalendar();
  const { selectedDoctor } = useDoctors();

  const { loading, error, patients, isDebouncing } = useSearchPatients(clinicId, patientSearch);

  //const [createAppointment, { loading, error }] = useMutation(CREATE_APPOINTMENT);

  // 3. Dispatch Form Submit payload to GraphQL Backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedDoctor?.userId ||
      !selectedStartTime ||
      !selectedEndTime ||
      !patientSearch
    )
      return;

    try {
      //   await createAppointment({
      //     variables: {
      //       input: {
      //         clinicId,
      //         doctorId: selectedDoctorId,
      //         appointmentDate: selectedDate,
      //         startTime: selectedTime,
      //         patientNameMock: patientSearch,
      //       }
      //     }
      //   });
      onClose(); // Close modal upon successful completion
    } catch (err) {
      console.error("Failed to create appointment:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 w-full max-w-md border border-gray-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            {/* Soft Boxed Medical Teal Container */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-transparent text-blue border border-teal-100/40 shadow-sm">
              <CalendarPlus size={20} strokeWidth={2.25} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">New Appointment</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          {/* Field 1: Patient Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1.5">
              Patient Name:
            </label>
            <input
              type="text"
              required
              placeholder="Type patient's name..."
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
            />

            {(loading || isDebouncing) && patientSearch.trim().length >= 3 && (
              <p className="text-gray-500 mt-2">Searching clinic database...</p>
            )}

            <ul className="mt-4">
              {patients.map((patient: any) => (
                <li key={patient._id}>
                  {patient.firstName} {patient.lastName}
                </li>
              ))}
            </ul>
          </div>

          {/* Field 2: Medical Specialist - Read Only Block */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1.5">
              Medical Specialist:
            </label>
            <div className="w-full rounded-xl bg-gray-50/80 px-3.5 py-2.5 border border-gray-100 text-sm font-semibold text-gray-700">
              {`${selectedDoctor?.fullName || "Dr. Jhon Doe"} (${selectedDoctor?.specialty || "Internal Medicine"})`}
            </div>
          </div>

          {/* Field 3: Selected Time Row */}
          <div className="flex items-center justify-between py-1">
            <span className="text-sm font-bold text-gray-800">
              Selected Time:
            </span>
            <div className="flex items-center gap-1.5 text-sm font-semibold">
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-emerald-700 border border-emerald-100/40">
                {selectedStartTime || "3:00 PM"}
              </span>
              <span className="text-gray-300 font-normal mx-0.5">→</span>
              <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-1 text-amber-700 border border-amber-100/40">
                {selectedEndTime || "3:30 PM"}
              </span>
            </div>
          </div>

          {/* Field 4: Appointment Status Toggle */}
          <div className="flex justify-between items-center py-1">
            <span className="text-sm font-bold text-gray-800">
              Appointment Status:
            </span>
            <div className="inline-flex rounded-xl bg-gray-100 p-1 border border-gray-200/40">
              <button
                type="button"
                onClick={() => setStatus(APPOINTMENT_STATUS_MAP.PENDING)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                  status === APPOINTMENT_STATUS_MAP.PENDING
                    ? "bg-amber-50 text-amber-700 shadow-sm border border-amber-200/30"
                    : "text-gray-400 hover:text-gray-600 border border-transparent"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${status === APPOINTMENT_STATUS_MAP.PENDING ? "bg-amber-500" : "bg-transparent"}`}
                />
                Pending
              </button>
              <button
                type="button"
                onClick={() => setStatus(APPOINTMENT_STATUS_MAP.CONFIRMED)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                  status === APPOINTMENT_STATUS_MAP.CONFIRMED
                    ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200/30"
                    : "text-gray-400 hover:text-gray-600 border border-transparent"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${status === APPOINTMENT_STATUS_MAP.CONFIRMED ? "bg-emerald-500" : "bg-transparent"}`}
                />
                Confirmed
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedStartTime || !selectedEndTime}
              className="rounded-xl bg-slate-950 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow"
            >
              Save Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
