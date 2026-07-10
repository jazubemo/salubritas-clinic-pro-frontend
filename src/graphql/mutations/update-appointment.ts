import { gql } from "@apollo/client";

export const UPDATE_APPOINTMENT_QUERY = gql`
  mutation UpdateAppointment(
    $activeClinicId: String!
    $updateAppointmentId: ID!
    $updateAppointmentInput: UpdateAppointmentInput!
  ) {
    updateAppointment(
      activeClinicId: $activeClinicId
      id: $updateAppointmentId
      updateAppointmentInput: $updateAppointmentInput
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
