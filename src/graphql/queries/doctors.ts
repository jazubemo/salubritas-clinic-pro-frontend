import { gql } from "@apollo/client";

export const DOCTORS_QUERY = gql`
  query Doctors($activeClinicId: String!) {
    doctors(activeClinicId: $activeClinicId) {
      _id
      email
      firstName
      lastName
      fullName
      clinicMemberships {
        shifts {
          daysOfWeek
          endTime
          startTime
        }
      }
      doctorProfile {
        specialty
      }
    }
  }
`;
