import { BaseType } from "./base";
import { MessageType } from "./message";
import { RoomType } from "./room";

export interface UserType extends BaseType {
  __typename: "User";
  name: string;
  rooms?: Array<RoomType>;
  message?: Array<MessageType>;
}
