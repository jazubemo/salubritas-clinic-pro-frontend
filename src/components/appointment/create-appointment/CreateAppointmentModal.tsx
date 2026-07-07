"use client";

import { useCalendar } from "@/hooks/useCalendar";
import { useDoctors } from "@/hooks/useDoctors";

import { CalendarPlus } from "lucide-react";
import React, { useState, useEffect } from "react";
import PatientSelectDropdown from "./PatientSelectDropdown";
import { Appointment, User } from "@/__generated__/graphql";
import { useMutation } from "@apollo/client/react";
import { CREATE_APPOINTMENT_QUERY } from "@/graphql/mutations/create-appointment";
import { toast } from "sonner";
import { useAppointments } from "@/hooks/useAppointments";

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
  const [selectedPatient, setSelectedPatient] = useState<Partial<User> | null>(
    null,
  );
  const [status, setStatus] = useState(APPOINTMENT_STATUS_MAP.PENDING);
  const [isNewPatient, setIsNewPatient] = useState<boolean>(false);
  const [reason, setReason] = useState("");

  const { selectedTime } = useCalendar();
  const { selectedDoctor } = useDoctors();
  const { addAppointment } = useAppointments();

  const enableButton =
    !selectedDoctor?.userId ||
    !selectedTime?.start ||
    !selectedTime.end ||
    !selectedPatient;

  const [createAppointment, { loading, error }] = useMutation(CREATE_APPOINTMENT_QUERY);

  const handleOnCloseModal = (e: any) => {
    e.stopPropagation()
    setSelectedPatient(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const newlyCreatedAppointment = await createAppointment({
          variables: {
            input: {
              activeClinicId: clinicId,
              doctorId: selectedDoctor?.userId,
              startTime: selectedTime?.start.timestamp,
              endTime: selectedTime?.end.timestamp,
              patientId: selectedPatient?._id,
              status: status.toUpperCase() || "PENDING",
              isNewPatient,
              reason,
            }
          }
        });
      onClose();
      toast.success("Success", {
        description: "You've successfully created this appointment.",
      });
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-transparent text-blue border border-teal-100/40 shadow-sm">
              <CalendarPlus size={20} strokeWidth={2.25} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">New Appointment</h3>
          </div>
          <button
            onClick={handleOnCloseModal}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          {/* Field 1: Patient Selection */}
          <PatientSelectDropdown
            clinicId={clinicId}
            selectedPatient={selectedPatient}
            setSelectedPatient={setSelectedPatient}
          />

          <div className="flex flex-row items-end gap-6 mb-5">
            <div className="flex flex-col gap-1.5 shrink-0 w-28">
              <span className="text-xs font-bold text-gray-700 whitespace-nowrap">
                Is New Patient?
              </span>

              <div className="flex items-center gap-2 h-9">
                <button
                  type="button"
                  onClick={() => setIsNewPatient(!isNewPatient)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isNewPatient ? "bg-slate-900" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isNewPatient ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>

                <span className="text-xs font-medium text-gray-600 w-8">
                  {isNewPatient ? "Yes" : "No"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-bold text-gray-700">
                Appointment Reason:
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Routine checkup, follow-up, test results..."
                className="w-full border border-gray-200 rounded-lg px-3 h-9 text-xs focus:outline-none focus:border-slate-400 bg-white placeholder-gray-400 shadow-sm"
              />
            </div>
          </div>

          {/* Field 2: Medical Specialist - Read Only Block */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1.5">
              Medical Specialist:
            </label>
            <div className="w-full rounded-xl bg-gray-50/80 px-3.5 py-2.5 border border-gray-100 text-sm font-semibold text-gray-700">
              {`${selectedDoctor?.fullName} (${selectedDoctor?.specialty})`}
            </div>
          </div>

          {/* Field 3: Selected Time Row */}
          <div className="flex items-center justify-between py-1">
            <span className="text-sm font-bold text-gray-800">
              Selected Time:
            </span>
            <div className="flex items-center gap-1.5 text-sm font-semibold">
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-emerald-700 border border-emerald-100/40">
                {selectedTime?.start.human}
              </span>
              <span className="text-gray-300 font-normal mx-0.5">→</span>
              <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-1 text-amber-700 border border-amber-100/40">
                {selectedTime?.end.human}
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
              onClick={handleOnCloseModal}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={enableButton || loading}
              className="rounded-xl bg-slate-950 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow cursor-pointer"
            >
              Save Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
