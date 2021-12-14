import React, { useCallback } from "react";
import styled from "@emotion/styled";

import useInput from "hooks/useInput";

import Overlay, { OverlayProps } from "components/common/Overlay";
import Table, { TableProps } from "components/common/Table";

export type UserInfo = { id: string; name: string; email: string };

export interface CreateDialogProps {
  isOpen: boolean;
  data?: Array<UserInfo>;
  onClose?: OverlayProps["onClose"];
  onSubmit: (email: string) => void;
  onClick: (data: any) => void;
}

const TABLE_STRUCTURE: TableProps<UserInfo>["structure"] = [
  { id: "email", title: "이메일", flex: "2" },
  { id: "name", title: "이름", flex: "1" },
];

function CreateDialog({
  data,
  onClose,
  onSubmit,
  isOpen,
  onClick,
}: CreateDialogProps) {
  const [email, setEmail] = useInput({});

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(email);
    },
    [email, onSubmit]
  );

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <Input value={email} onChange={setEmail} placeholder="email" />
          <Button type="submit">검색</Button>
        </form>
        <Table structure={TABLE_STRUCTURE} data={data} onClick={onClick} />
      </Wrapper>
    </Overlay>
  );
}

export default CreateDialog;

const Wrapper = styled.div`
  min-width: 30rem;
  padding: 1rem;
  background-color: white;

  & > form {
    margin-bottom: 1rem;
    height: 2rem;
    display: flex;
    justify-content: space-between;
  }
`;

const Input = styled.input`
  width: calc(85% - 0.3rem);
  border: 1px solid black;
  padding: 0.5rem;
`;

const Button = styled.button`
  border-radius: 0.5rem;
  width: calc(15% - 0.3rem);
  height: 100%;
`;
