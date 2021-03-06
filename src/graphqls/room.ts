import { gql } from "@apollo/client";

import { BaseType } from "./base";
import { MessageType } from "./message";
import { UserType } from "./user";

export interface RoomType extends BaseType {
  __typename: "Room";
  createdAt: Date;
  updatedAt: Date;
  users: Array<UserType>;
  messages: Array<MessageType>;
}

export const QUERY_ROOM_LIST = gql`
  query rooms {
    rooms {
      id
      users {
        email
      }
      messages {
        text
        createdAt
      }
    }
  }
`;

export const QUERY_ROOM_BY_ID = gql`
  query roomById($id: Int!) {
    roomById(id: $id) {
      id
      users {
        id
        fullName
        email
      }
      messages {
        id
        text
        user {
          id
          fullName
          email
        }
      }
    }
  }
`;

export const MUTATION_CREATE_ROOM_BY_ID = gql`
  mutation createRoomByUserId($userId: String!) {
    createRoomByUserId(userId: $userId)
  }
`;

export const SUBSCRIPTION_UPDATE_ROOM_LIST = gql`
  subscription roomListUpdate {
    roomListUpdate {
      rooms {
        id
        messages {
          text
          createdAt
        }
      }
    }
  }
`;

export const SUBSCRIPTION_UPDATE_CHATTING = gql`
  subscription chattingUpdate {
    chattingUpdate {
      id
      users {
        id
        fullName
        email
      }
      messages {
        id
        text
        user {
          id
          fullName
          email
        }
      }
    }
  }
`;
