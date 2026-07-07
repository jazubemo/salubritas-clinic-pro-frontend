import { SEARCH_PATIENTS_QUERY } from "@/graphql/queries/searchPatients";
import { useLazyQuery } from "@apollo/client/react";
import { useEffect, useMemo } from "react";
import debounce from 'lodash.debounce';
import { User } from "firebase/auth";

export function useSearchPatients(clinicId: string, input: string, selectedPatient: Partial<User> | null) {
  const [getPatients, { loading, data, error }] = useLazyQuery(
    SEARCH_PATIENTS_QUERY,
  );

  const debouncedFetch = useMemo(
    () =>
      debounce((searchTerm: string) => {
        getPatients({ variables: { activeClinicId: clinicId, query: searchTerm } });
      }, 300),
    [getPatients, clinicId],
  );

  useEffect(() => {
    if (selectedPatient) {
      debouncedFetch.cancel();
      return;
    }

    const trimmedInput = input.trim();
    if (trimmedInput.length >= 3) {
      debouncedFetch(trimmedInput);
    }

    return () => debouncedFetch.cancel();
  }, [input, debouncedFetch]);

  return {
    loading,
    error,
    patients: data?.searchPatients || [],
  };
}

