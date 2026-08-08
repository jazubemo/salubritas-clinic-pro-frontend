import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetMe {
    getMe {
      authId
      createdAt
      dni
      email
      fullName
      doctor {
        id
        specialty
      }
      patient {
        id
      }
      clinicMemberships {
        clinicId
        createdAt
        id
        name
        roles
        status
        updatedAt
      }
    }
  }
`;
