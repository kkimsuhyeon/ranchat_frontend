import React, { useEffect, useState, useCallback } from "react";

import useCustomLazyQuery from "hooks/useCustomLazyQuery";

import { QUERY_USER_BY_EMAIL } from "graphqls/user";

import CreateDialog, { CreateDialogProps } from "components/room/CreateDialog";

export interface CreateDialogContainerProps {
  isOpen: boolean;
  onClose: CreateDialogProps["onClose"];
}

function CreateDialogContainer({
  isOpen,
  onClose,
}: CreateDialogContainerProps) {
  const [userData, setUserData] = useState<CreateDialogProps["data"]>();

  const { request, data } = useCustomLazyQuery<
    { email?: string },
    { userByEmail: Array<{ id: string; email: string; fullName: string }> }
  >({
    query: QUERY_USER_BY_EMAIL,
  });

  const handleSearch = useCallback(
    (email: string) => {
      request({ variables: { email: email } });
    },
    [request]
  );

  useEffect(() => {
    request({ variables: { email: "" } });
  }, [request, isOpen]);

  useEffect(() => {
    setUserData(() =>
      data?.userByEmail.map((item) => ({
        email: item.email,
        id: item.id,
        name: item.fullName,
      }))
    );
  }, [data]);

  return (
    <CreateDialog
      data={userData}
      onSubmit={handleSearch}
      onClose={onClose}
      isOpen={isOpen}
    />
  );
}

export default CreateDialogContainer;
