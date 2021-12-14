import { gql } from "@apollo/client";

import { BaseType } from "./base";
import { MessageType } from "./message";
import { RoomType } from "./room";

export interface UserType extends BaseType {
  __typename: "User";
  id: string;
  fullName?: string;
  email: string;
  rooms?: Array<RoomType>;
  message?: Array<MessageType>;
}

export const MUTATION_CREATE_USER = gql`
  mutation createUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $bio: String
  ) {
    createUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      bio: $bio
    ) {
      id
      email
      fullName
    }
  }
`;

export const QUERY_REQUEST_TOKEN = gql`
  query requestToken($email: String!, $password: String!) {
    requestToken(email: $email, password: $password)
  }
`;

export const QUERY_USER_BY_EMAIL = gql`
  query userByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      fullName
      email
    }
  }
`;
