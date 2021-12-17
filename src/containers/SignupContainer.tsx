import React, { useCallback } from "react";
import styled from "@emotion/styled";

import InputForm, { InputFormProps } from "components/signup/InputForm";

function SignupContainer() {
  const regist = useCallback<InputFormProps["onSubmit"]>(
    ({ bio, email, firstName, lastName, password }) => {
      console.log(email);
      console.log(password);
    },
    []
  );

  return (
    <Wrapper>
      <InputForm onSubmit={regist} />
    </Wrapper>
  );
}

export default SignupContainer;

const Wrapper = styled.article`
  width: 18rem;
`;
