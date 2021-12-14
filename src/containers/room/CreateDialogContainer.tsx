import React, { useEffect, useState, useCallback } from "react";
import { useMutation } from "@apollo/client";

import useCustomLazyQuery from "hooks/useCustomLazyQuery";
import useSpinner from "hooks/useSpinner";

import { QUERY_USER_BY_EMAIL } from "graphqls/user";
import { MUTATION_CREATE_ROOM_BY_ID } from "graphqls/room";

import CreateDialog, { CreateDialogProps } from "components/room/CreateDialog";

export interface CreateDialogContainerProps {
  isOpen: boolean;
  onClose: CreateDialogProps["onClose"];
}

function CreateDialogContainer({
  isOpen,
  onClose,
}: CreateDialogContainerProps) {
  const [activeSpinner] = useSpinner();

  const [userList, setUserList] = useState<CreateDialogProps["data"]>();

  const { request: requestUserData, data: userData } = useCustomLazyQuery<
    { email?: string },
    { userByEmail: Array<{ id: string; email: string; fullName: string }> }
  >({
    query: QUERY_USER_BY_EMAIL,
  });

  const [requestCreateRoom] = useMutation(MUTATION_CREATE_ROOM_BY_ID);

  const handleCreateRoom = useCallback<CreateDialogProps["onClick"]>(
    async (data) => {
      try {
        activeSpinner(true);
        await requestCreateRoom({ variables: { userId: data.id } });
      } finally {
        activeSpinner(false);
      }
    },
    [requestCreateRoom, activeSpinner]
  );

  const handleSearch = useCallback(
    (email: string) => {
      requestUserData({ variables: { email: email } });
    },
    [requestUserData]
  );

  useEffect(() => {
    requestUserData({ variables: { email: "" } });
  }, [requestUserData, isOpen]);

  useEffect(() => {
    setUserList(() =>
      userData?.userByEmail.map((item) => ({
        email: item.email,
        id: item.id,
        name: item.fullName,
      }))
    );
  }, [userData]);

  return (
    <CreateDialog
      isOpen={isOpen}
      data={userList}
      onSubmit={handleSearch}
      onClose={onClose}
      onClick={handleCreateRoom}
    />
  );
}

export default CreateDialogContainer;
