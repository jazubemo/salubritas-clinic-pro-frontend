"use client";

import { MINUTES_IN_AN_HOUR } from "@/common/constants/time";
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
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [patientSearch, setPatientSearch] = useState<string>("");

  const { doctors: availableDoctors } = useDoctors();
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

  // 2. Recalculate working slots whenever the selected doctor changes
  //   useEffect(() => {

  //     const doctor = doctorsList.find(d => d.userId === selectedDoctorId);
  //     if (!doctor) return;

  //     // Extract the day index (0 = Sunday, 1 = Monday...) from the calendar date string
  //     const dayOfWeek = new Date(selectedDate).getDay();

  //     // Look for a recurring rule matching this weekday inside their clinicMembership
  //     const matchingRule = doctor.availabilities.find(rule =>
  //       rule.daysOfWeek.includes(dayOfWeek)
  //     );

  //     if (matchingRule) {
  //       const slots = generateSlots(matchingRule.startTime, matchingRule.endTime, doctor.slotDurationMinutes);
  //       setAvailableSlots(slots);
  //     } else {
  //       setAvailableSlots([]); // Doctor is not scheduled to work on this weekday
  //     }
  //     setSelectedTime(''); // Reset time selection when doctor updates
  //   }, [selectedDoctorId, selectedDate, doctorsList]);

  // 3. Dispatch Form Submit payload to GraphQL Backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctorId || !selectedTime || !patientSearch) return;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-gray-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)]">
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
          <div>
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
          </div>

          {/* Step 3: Dynamic Available Hours Grid */}
          {selectedDoctorId && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Slots for
              </label>

              {/* {availableSlots.length > 0 ? (
                <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1 border rounded-lg bg-gray-50">
                  {availableSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-md p-2 text-xs font-semibold border text-center transition-all ${
                        selectedTime === time
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-red-500 bg-red-50 p-2.5 rounded-lg border border-red-100">
                  ⚠️ This doctor has no availability configured for this day of the week.
                </p>
              )} */}
            </div>
          )}

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
              disabled={!selectedTime}
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
