import React, { useCallback } from "react";
import styled from "@emotion/styled";

import useInput from "hooks/useInput";
import { Button } from "@mui/material";

export interface SendFormProps {
  onSubmit: (text: string) => void;
}

function SendForm({ onSubmit }: SendFormProps) {
  const [text, changeText] = useInput({});

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(text);
      changeText("");
    },
    [onSubmit, text, changeText]
  );

  return (
    <article>
      <Form onSubmit={handleSubmit}>
        <input value={text} onChange={changeText} />
        <Button type="submit" variant="contained">
          제출
        </Button>
      </Form>
    </article>
  );
}

export default SendForm;

const Form = styled.form`
  display: flex;
  height: 100%;

  & > input {
    outline: none;
    font-size: 0.9rem;
    padding: 0.5rem;
    width: 100%;
  }

  & > button {
    width: 7rem;
  }
`;
