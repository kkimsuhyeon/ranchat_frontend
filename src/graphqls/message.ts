import { gql } from "@apollo/client";

import { BaseType } from "./base";
import { RoomType } from "./room";
import { UserType } from "./user";

export interface MessageType extends BaseType {
  __typename: "Message";
  text: string;
  user: UserType;
  room: RoomType;
  createdAt: Date;
}

export const MUTATION_SEND_MESSAGE = gql`
  mutation sendMessage($message: String!, $roomId: Int!) {
    sendMessage(message: $message, roomId: $roomId)
  }
`;
