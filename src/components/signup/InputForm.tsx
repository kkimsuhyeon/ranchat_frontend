import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Input } from "@mui/material";

import useInput from "hooks/useInput";

import SelectBox from "components/common/SelectBox";

export interface InputFormProps {
  onSubmit: ({
    email,
    password,
    firstName,
    lastName,
    bio,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    bio?: "W" | "M";
  }) => void;
}

function InputForm({ onSubmit }: InputFormProps) {
  const [email, changeEmail] = useInput({ preChange: () => setChecked(true) });
  const [password, changePassword] = useInput({
    preChange: () => setChecked(true),
  });
  const [firstName, changeFirstName] = useInput({
    preChange: () => setChecked(true),
  });
  const [lastName, changeLastName] = useInput({
    preChange: () => setChecked(true),
  });

  const [bio, setBio] = useState();
  const [isChecked, setChecked] = useState<boolean>(true);

  const changeBio = useCallback(
    (value) => {
      setBio(value);
    },
    [setBio]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!email || !password || !firstName || !lastName) {
        setChecked(false);
        return;
      }

      onSubmit({ email, password, firstName, lastName, bio });
    },
    [email, password, firstName, lastName, bio, onSubmit]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <span>
        <label htmlFor="email">email * </label>
        <Input
          id="email"
          value={email}
          onChange={changeEmail}
          autoComplete="off"
        />
      </span>
      <span>
        <label htmlFor="password">password *</label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={changePassword}
        />
      </span>
      <span>
        <label htmlFor="firstName">first name *</label>
        <Input
          id="firstName"
          value={firstName}
          onChange={changeFirstName}
          autoComplete="off"
        />
      </span>
      <span>
        <label htmlFor="lastName">last name *</label>
        <Input
          id="lastName"
          value={lastName}
          onChange={changeLastName}
          autoComplete="off"
        />
      </span>
      <SelectBox
        list={{ W: "여자", M: "남자" }}
        defaultValue={bio}
        onChange={changeBio}
        clear
      />
      <SubmitButton type="submit">가입하기</SubmitButton>
      {!isChecked && <Error>* 필수값을 모두 입력해주세요.</Error>}
    </Form>
  );
}

export default InputForm;

const Form = styled.form`
  & > span {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1rem;
  }
`;

const SubmitButton = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 1rem;
  background-color: rgba(255, 0, 100, 0.25);
  cursor: pointer;
`;

const Error = styled.div`
  font-size: 0.8rem;
  margin-top: 0.3rem;
  color: red;
`;
