import React, { useState, useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import { useMutation, useQuery } from "@apollo/client";

import { SEND_MESSAGE } from "graphqls/message";
import {
  SUBSCRIPTION_UPDATE_ROOM,
  QUERY_ROOM_BY_ID,
  RoomType,
} from "graphqls/room";

import ChattingContainer from "containers/ChattingContainer";

function Chatting() {
  const [text, setText] = useState<string>("");

  const { loading, data, error, subscribeToMore } = useQuery<
    { roomById: RoomType },
    { id: number }
  >(QUERY_ROOM_BY_ID, {
    variables: { id: 1 },
  });

  const [sendMessage, messageData] = useMutation(SEND_MESSAGE);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      sendMessage({ variables: { message: text } });
    },
    [sendMessage, text]
  );

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
      <ChattingContainer />
    </Wrapper>
  );
}

export default Chatting;

const Wrapper = styled.section``;
