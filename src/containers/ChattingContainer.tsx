import React, { useCallback, useMemo, useEffect } from "react";
import styled from "@emotion/styled";
import { useMutation, useQuery } from "@apollo/client";

import { SEND_MESSAGE } from "graphqls/message";
import {
  SUBSCRIPTION_UPDATE_ROOM,
  QUERY_ROOM_BY_ID,
  RoomType,
} from "graphqls/room";

import SendForm from "components/chatting/SendForm";
import MessageList, { MessageListProps } from "components/chatting/MessageList";

function ChattingContainer() {
  const {
    loading,
    data: roomData,
    error,
    subscribeToMore,
  } = useQuery<{ roomById: RoomType }, { id: number }>(QUERY_ROOM_BY_ID, {
    variables: { id: 1 },
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
      if (acc === undefined) return [{ type: "send", text: cur.text }];
      return [...acc, { type: "send", text: cur.text }];
    }, []);

    return result;
  }, [roomData]);

  useEffect(() => {
    subscribeToMore<{ update: RoomType }>({
      document: SUBSCRIPTION_UPDATE_ROOM,
      updateQuery: (prev, { subscriptionData: { data } }) => {
        if (!data) return prev;
        return { roomById: { ...prev.roomById, ...data.update } };
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
  background-color: whitesmoke;

  & > article {
    &:first-of-type {
      padding: 1rem;
      height: calc(100% - 3rem);
      overflow-y: auto;
    }

    &:last-of-type {
      height: 3rem;
    }
  }
`;
