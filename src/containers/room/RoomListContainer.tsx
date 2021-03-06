import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";

import useCustomQuery from "hooks/useCustomQuery";
import useSpinner from "hooks/useSpinner";

import {
  QUERY_ROOM_LIST,
  RoomType,
  SUBSCRIPTION_UPDATE_ROOM_LIST,
} from "graphqls/room";

import RoomCard from "components/room/RoomCard";
import CreateButton from "components/room/CreateButton";

import CreateDialogContainer from "containers/room/CreateDialogContainer";
import { UserType } from "graphqls/user";

export interface RoomListContainerProps {
  onClick: (id: string) => void;
}

function RoomListContainer({ onClick }: RoomListContainerProps) {
  const [setSpinner] = useSpinner();

  const { data, loading, subscribeToMore } = useCustomQuery<
    void,
    { rooms: Array<RoomType> },
    "query"
  >({
    type: "query",
    query: QUERY_ROOM_LIST,
  });

  const [isOpen, setOpen] = useState<boolean>(false);

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    setSpinner(loading);
  }, [loading, setSpinner]);

  useEffect(() => {
    subscribeToMore<{ roomListUpdate: UserType }>({
      document: SUBSCRIPTION_UPDATE_ROOM_LIST,
      updateQuery: (prev, { subscriptionData: { data } }) => {
        if (!data) return prev;
        return {
          rooms: [
            ...prev.rooms,
            ...(data.roomListUpdate.rooms as Array<RoomType>),
          ],
        };
      },
    });
  }, [subscribeToMore]);

  return (
    <>
      <Wrapper>
        {data?.rooms.map((room) => (
          <RoomCard
            key={room.id}
            id={Number(room.id)}
            message={
              room.messages.length !== 0
                ? room.messages[room.messages.length - 1].text
                : ""
            }
            updatedAt={room.updatedAt}
            onClick={() => onClick(room.id)}
          />
        ))}

        <CreateButton onClick={openDialog} />
      </Wrapper>
      <CreateDialogContainer isOpen={isOpen} onClose={closeDialog} />
    </>
  );
}

export default RoomListContainer;

const Wrapper = styled.section`
  position: relative;
  height: 100%;
  overflow-y: overlay;

  &::-webkit-scrollbar {
    width: 0.3rem;
    background-color: transparent;

    &-thumb {
      background-color: pink;
      border-radius: 1rem;
    }
  }

  & > span {
    bottom: 20px;
    right: 50%;
    left: 49%;
  }
`;
