"use client";

import { MINUTES_IN_AN_HOUR } from "@/common/constants/time";
import { useAppointments } from "@/hooks/useAppointments";
import { useDoctors } from "@/hooks/useDoctors";
import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinicId: string;
}

export default function CreateAppointmentModal({
  isOpen,
  onClose,
  clinicId,
}: ModalProps) {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");
  const [patientSearch, setPatientSearch] = useState<string>("");

  const { selectedStartTime, selectedEndTime } = useAppointments();
  //const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  //const [createAppointment, { loading, error }] = useMutation(CREATE_APPOINTMENT);

  // Helper to convert "HH:MM" string to total minutes
  const timeStringToMinutes = (timeString: string): number => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * MINUTES_IN_AN_HOUR + minutes;
  };

  // Helper to format total minutes back to "HH:MM"
  const minutesToTimeString = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / MINUTES_IN_AN_HOUR);
    const minutes = totalMinutes % MINUTES_IN_AN_HOUR;

    const pad = (num: number) => num.toString().padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}`;
  };

  // Main Function: Single Responsibility, High Readability
  const generateSlots = (
    start: string,
    end: string,
    interval: number,
  ): string[] => {
    const slots: string[] = [];

    let currentMins = timeStringToMinutes(start);
    const endMins = timeStringToMinutes(end);

    while (currentMins + interval <= endMins) {
      slots.push(minutesToTimeString(currentMins));
      currentMins += interval;
    }

    return slots;
  };

  // 3. Dispatch Form Submit payload to GraphQL Backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedDoctorId ||
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
        className="bg-white rounded-2xl p-6 w-full max-w-md border border-gray-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-xl font-bold text-gray-900">New Appointment</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          {/* Step 1: Patient Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient Name
            </label>
            <input
              type="text"
              required
              placeholder="Type patient's name..."
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Step 2: Doctor Selection */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medical Specialist
            </label>
            <select
              required
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all bg-white"
            >
              <option value="">Select a doctor...</option>
              {availableDoctors.map((doc) => (
                <option key={doc.userId} value={doc.userId}>
                  {doc.fullName}
                </option>
              ))}
            </select>
          </div> */}
          {/* Medical Specialist - Read Only Block */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500 mb-1.5">
              Medical Specialist
            </label>
            <div className="w-full rounded-xl bg-gray-50/80 px-3.5 py-2.5 border border-gray-100 text-sm font-semibold text-gray-700">
              Dr. Jhon Doe
            </div>
          </div>

          {/* Compact Inline Selected Time Row */}
          <div className="mt-4 mb-5 flex items-center justify-between border-b border-gray-100 pb-4 px-1">
            {/* Left Label */}
            <span className="text-sm font-medium text-gray-500">
              Selected Time
            </span>

            {/* Time Range Caps */}
            <div className="flex items-center gap-1.5 text-sm font-semibold">
              {/* Start Time */}
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-emerald-700 border border-emerald-100/40">
                {selectedStartTime}
              </span>

              {/* Divider Arrow */}
              <span className="text-gray-300 font-normal mx-0.5">→</span>

              {/* End Time */}
              <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-1 text-amber-700 border border-amber-100/40">
                {selectedEndTime}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 border-t pt-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedStartTime || !selectedEndTime}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {"Confirm Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
