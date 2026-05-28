import { graphql } from "../../__generated__/gql";

export const GET_USERS = graphql(`
  query Query($activeClinicId: String!) {
    getUsers(activeClinicId: $activeClinicId) {
      _id
      authId
      dni
      firstName
      lastName
    }
  }
`);
