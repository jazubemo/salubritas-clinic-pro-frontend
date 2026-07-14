import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetMe {
    getMe {
      _id
      authId
      dni
      email
      firstName
      lastName
      fullName 
      clinicMemberships {
        name
        roles
        status
        clinicId
        shifts {
          daysOfWeek
          endTime
          startTime
        }
      }
    }
  }
`;
