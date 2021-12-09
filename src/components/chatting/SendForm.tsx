import React, { useCallback } from "react";
import styled from "@emotion/styled";

import useInput from "hooks/useInput";
import { Button } from "@mui/material";

export interface SendFormProps {
  onSubmit: (text: string) => void;
  loading: boolean;
}

function SendForm({ onSubmit, loading }: SendFormProps) {
  const [text, changeText] = useInput({});

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(text);
      changeText("");
    },
    [onSubmit, text, changeText]
  );

  console.log(loading);

  return (
    <article>
      <Form onSubmit={handleSubmit}>
        <input value={text} onChange={changeText} disabled={loading} />
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

    &:disabled {
      background: rgba(0, 0, 0, 0.2);
    }
  }

  & > button {
    width: 7rem;
  }
`;
