import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { Input } from "@mui/material";

import useInput from "hooks/useInput";

import { Div } from "components/common/Box";

export interface InputFormProps {
  onSubmit: ({ id, password }: { id: string; password: string }) => void;
}

function InputForm({ onSubmit }: InputFormProps) {
  const [id, changeId] = useInput({});
  const [password, changePassword] = useInput({});

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ id, password });
    },
    [onSubmit, id, password]
  );

  return (
    <article>
      <Form onSubmit={handleSubmit}>
        <Div margin="0 0 0.5rem 0">
          <Input value={id} onChange={changeId} />
        </Div>
        <Div margin="0 0 1rem 0">
          <Input type="password" value={password} onChange={changePassword} />
        </Div>
        <button type="submit">로그인</button>
      </Form>
    </article>
  );
}

export default InputForm;

const Form = styled.form`
  & > button {
    padding: 0.5rem;
    width: 100%;
    background: pink;
  }
`;
