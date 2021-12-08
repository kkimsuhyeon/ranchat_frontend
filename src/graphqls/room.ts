import { gql } from "@apollo/client";

import { BaseType } from "./base";
import { MessageType } from "./message";
import { UserType } from "./user";

export interface RoomType extends BaseType {
  __typename: "Room";
  users: Array<UserType>;
  messages: Array<MessageType>;
}

export const QUERY_ROOM_BY_ID = gql`
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

export const SUBSCRIPTION_UPDATE_ROOM = gql`
  subscription updateRoom {
    update {
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
