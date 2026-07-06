"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchPatients } from "@/hooks/useSearchPatients";
import { User } from "@/__generated__/graphql";

interface PatientSelectDropdownProps {
  clinicId: string;
}

export default function PatientSelectDropdown({
  clinicId,
}: PatientSelectDropdownProps) {
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Partial<User> | null>(
    null,
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { loading, error, patients, isDebouncing } = useSearchPatients(
    clinicId,
    patientSearch,
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

    if (selectedPatient) {
      setSelectedPatient(null);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-sm font-bold text-gray-800 mb-1.5">
        Patient Name:
      </label>

      <div className="relative">
        <input
          type="text"
          required
          placeholder="Type patient's name..."
          value={patientSearch}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          className={`w-full rounded-xl border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400 `}
        />
      </div>

      {(loading || isDebouncing) && patientSearch.trim().length >= 3 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl p-3 shadow-lg text-sm text-gray-500">
          Searching clinic database...
        </div>
      )}

      {isDropdownOpen &&
        patientSearch.trim().length >= 3 &&
        !(loading || isDebouncing) && (
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
