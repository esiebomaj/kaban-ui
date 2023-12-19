import { gql } from "@apollo/client";

export const GET_TASkS = gql`
  query GetTasks {
    cards {
      id
      title
      created_at
    }
  }
`;
