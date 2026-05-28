import { graphql } from '../../__generated__/gql';

export const GET_USERS = graphql(`
  query GetUsers {
    users {
      id
      name
    }
  }
`);


