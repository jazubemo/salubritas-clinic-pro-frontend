import { gql } from "@apollo/client";

export const SEARCH_PATIENTS_QUERY = gql`
  query searchPatients($activeClinicId: String!, $query: String!) {
    searchPatients(activeClinicId: $activeClinicId, query: $query) {
      _id
      firstName
      lastName
    }
  }
`;
