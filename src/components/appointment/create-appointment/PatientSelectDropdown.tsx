"use client";

import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { useSearchPatients } from "@/hooks/useSearchPatients";
import { User } from "@/__generated__/graphql";

interface PatientSelectDropdownProps {
  clinicId: string;
  selectedPatient: Partial<User> | null;
  setSelectedPatient: Dispatch<SetStateAction<Partial<User> | null>>;
}

export default function PatientSelectDropdown({
  clinicId,
  selectedPatient,
  setSelectedPatient,
}: PatientSelectDropdownProps) {
  const [patientSearch, setPatientSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { loading, error, patients } = useSearchPatients(
    clinicId,
    patientSearch,
    selectedPatient
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPatient = (patient: Partial<User>) => {
    setSelectedPatient(patient);
    setPatientSearch(`${patient.firstName} ${patient.lastName}`);
    setIsDropdownOpen(false);
  };

  const handleInputChange = (value: string) => {
    setPatientSearch(value);
    setIsDropdownOpen(true);
  };

  const handleClearInput = () => {
    setPatientSearch("");
    setSelectedPatient(null);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-sm font-bold text-gray-800 mb-1.5">
        Patient Name:
      </label>

      <div className="relative flex items-center">
        <input
          type="text"
          required
          placeholder="Type patient's name..."
          value={patientSearch}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (patientSearch.trim().length >= 1) {
              setIsDropdownOpen(true);
            }
          }}
          className={`w-full rounded-xl border border-gray-300 p-2.5 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400`}
        />

        {patientSearch.length > 0 && (
          <button
            type="button"
            onClick={handleClearInput}
            aria-label="Clear patient search"
            className="absolute right-3 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://w3.org"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {loading && patientSearch.trim().length >= 3 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl p-3 shadow-lg text-sm text-gray-500">
          Searching clinic database...
        </div>
      )}

      {isDropdownOpen && patientSearch.trim().length >= 3 && !loading && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto divide-y divide-gray-100">
          {patients.length > 0 ? (
            patients.map((patient: Partial<User>) => (
              <button
                key={patient._id}
                type="button"
                onClick={() => handleSelectPatient(patient)}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors flex flex-col"
              >
                <span className="font-medium text-gray-900">
                  {patient.firstName} {patient.lastName}
                </span>
              </button>
            ))
          ) : (
            <div className="p-3 text-sm text-gray-400 text-center">
              No matching records found
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 mt-1">
          Failed to search records: {error.message}
        </p>
      )}
    </div>
  );
}
