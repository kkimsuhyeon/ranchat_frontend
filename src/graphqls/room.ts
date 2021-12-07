import { gql } from "@apollo/client";

export const REQUEST_ROOM_DETAIL_BY_ID = gql`
  query roomById($id: Int!) {
    roomById(id: $id) {
      id
      users {
        id
        name
      }
      messages {
        id
        text
        user {
          id
          name
        }
      }
    }
  }
`;
