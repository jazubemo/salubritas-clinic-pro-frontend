import { gql } from "@apollo/client";

export const CREATE_APPOINTMENT_QUERY = gql`
  mutation CreateAppointment(
    $activeClinicId: String!
    $createAppointmentInput: CreateAppointmentInput!
  ) {
    createAppointment(
      activeClinicId: $activeClinicId
      createAppointmentInput: $createAppointmentInput
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
