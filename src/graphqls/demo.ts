import { gql } from "@apollo/client";

export const DEMO_HELLO = gql`
  query {
    hello
  }
`;

export const DEMO_REQUEST_CALL = gql`
  mutation {
    requestCall
  }
`;

export const DEMO_CALL = gql`
  subscription {
    call
  }
`;
