import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetMe {
    getMe {
      _id
      authId
      clinicRoles
      dni
      email
      firstName
      lastName
      status
    }
  }
`;
