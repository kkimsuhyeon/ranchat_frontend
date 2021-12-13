import React, { useCallback, useMemo, useEffect } from "react";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/client";

import useUserInfo from "hooks/useUserInfo";
import useCustomQuery from "hooks/useCustomQuery";
import useSpinner from "hooks/useSpinner";

import { SEND_MESSAGE } from "graphqls/message";
import {
  SUBSCRIPTION_UPDATE_ROOM,
  QUERY_ROOM_BY_ID,
  RoomType,
} from "graphqls/room";

import SendForm from "components/chatting/SendForm";
import MessageList, { MessageListProps } from "components/chatting/MessageList";

export interface ChattingContainerProps {
  id: string;
}

function ChattingContainer({ id }: ChattingContainerProps) {
  const userInfo = useUserInfo();

  const {
    loading,
    data: roomData,
    subscribeToMore,
  } = useCustomQuery<{ id: number }, { roomById: RoomType }>({
    query: QUERY_ROOM_BY_ID,
    variables: { id: Number(id) },
  });

  const [requestSendMessage] = useMutation<void, { message: string }>(
    SEND_MESSAGE
  );

  const sendMessage = useCallback(
    (message: string) => {
      requestSendMessage({ variables: { message: message } });
    },
    [requestSendMessage]
  );

  const messages = useMemo(() => {
    const result = roomData?.roomById.messages.reduce<
      MessageListProps["messages"]
    >((acc, cur) => {
      let type: "send" | "receive";

      if (cur.user.email === userInfo.email) type = "send";
      else type = "receive";

      if (acc === undefined) return [{ type: type, text: cur.text }];
      return [...acc, { type: type, text: cur.text }];
    }, []);

    return result;
  }, [roomData, userInfo]);

  useEffect(() => {
    subscribeToMore<{ chattingUpdate: RoomType }>({
      document: SUBSCRIPTION_UPDATE_ROOM,
      updateQuery: (prev, { subscriptionData: { data } }) => {
        if (!data) return prev;
        return { roomById: { ...prev.roomById, ...data.chattingUpdate } };
      },
    });
  }, [subscribeToMore]);

  return (
    <Wrapper>
      <MessageList messages={messages} loading={loading} />
      <SendForm onSubmit={sendMessage} loading={loading} />
    </Wrapper>
  );
}

export default ChattingContainer;

const Wrapper = styled.section`
  width: 25rem;
  height: 100vh;
  margin: 0 auto;

  & > article {
    &:first-of-type {
      position: relative;
      padding: 1rem;
      height: calc(100% - 3rem);
      overflow-y: auto;

      &::-webkit-scrollbar {
        background-color: transparent;
        width: 0.5rem;

        &-thumb {
          background-color: pink;
          border-radius: 1rem;
        }
      }
    }

    &:last-of-type {
      height: 3rem;
    }
  }
`;
