import { useState, useEffect } from "react";
import { SEARCH_PATIENTS_QUERY } from "@/graphql/queries/searchPatients";
import { useQuery } from "@apollo/client/react";

export function useSearchPatients(clinicId: string, query: string) {
  const trimmedQuery = query.trim();
  
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(trimmedQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [trimmedQuery]);

  const { loading, data, error } = useQuery(SEARCH_PATIENTS_QUERY, {
    variables: { query: debouncedQuery, activeClinicId: clinicId },
    skip: debouncedQuery.length < 3,
  });

  const patients = data?.searchPatients || [];

  return { 
    loading, 
    error, 
    patients,
    isDebouncing: trimmedQuery !== debouncedQuery 
  };
}

