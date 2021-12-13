import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import RoomListContainer from "containers/RoomListContainer";

export interface RoomListProps {}

function RoomList() {
  const navigate = useNavigate();

  const goToChatting = useCallback(
    (id: string) => {
      navigate(`/room/${id}`);
    },
    [navigate]
  );

  return <RoomListContainer onClick={goToChatting} />;
}

export default RoomList;
