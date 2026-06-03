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
      clinicMemberships {
        name
        roles
        status
        clinicId
      }
    }
  }
`;
