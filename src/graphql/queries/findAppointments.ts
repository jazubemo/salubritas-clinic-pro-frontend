import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Appointments(
    $activeClinicId: String!
    $endRange: String!
    $startRange: String!
  ) {
    appointments(
      activeClinicId: $activeClinicId
      endRange: $endRange
      startRange: $startRange
    ) {
      _id
      clinicId
      createdAt
      doctorId
      doctorName
      endTime
      isNewPatient
      patientId
      patientName
      reason
      startTime
      status
      updatedAt
    }
  }
`;
