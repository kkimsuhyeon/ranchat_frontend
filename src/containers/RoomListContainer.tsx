import React, { useEffect } from "react";
import styled from "@emotion/styled";

import useCustomQuery from "hooks/useCustomQuery";
import useSpinner from "hooks/useSpinner";

import { QUERY_ROOM_LIST, RoomType } from "graphqls/room";

import RoomCard from "components/room/RoomCard";
import CreateButton from "components/room/CreateButton";

export interface RoomListContainerProps {
  onClick: (id: string) => void;
}

function RoomListContainer({ onClick }: RoomListContainerProps) {
  const [setSpinner] = useSpinner();

  const { data, loading } = useCustomQuery<void, { rooms: Array<RoomType> }>({
    query: QUERY_ROOM_LIST,
  });

  useEffect(() => {
    setSpinner(loading);
  }, [loading, setSpinner]);

  return (
    <>
      <Wrapper>
        {data?.rooms.map((room) => (
          <RoomCard
            key={room.id}
            id={Number(room.id)}
            message={room.messages[0].text}
            updatedAt={room.messages[0].createdAt}
            onClick={() => onClick(room.id)}
          />
        ))}

        <CreateButton onClick={() => {}} />
      </Wrapper>
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

    &-thumb {
      background-color: white;
      border-radius: 1rem;
    }
  }

  & > span {
    bottom: 20px;
    right: 50%;
    left: 49%;
  }
`;
