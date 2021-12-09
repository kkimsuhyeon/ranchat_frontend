import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { useLazyQuery } from "@apollo/client";

import { QUERY_REQUEST_TOKEN } from "graphqls/user";

import InputForm, { InputFormProps } from "components/login/InputForm";

export interface PropTypes {}

function LoginContainer() {
  const [requestLogin, loginResponse] = useLazyQuery<
    string,
    { email: string; password: string }
  >(QUERY_REQUEST_TOKEN, { errorPolicy: "all" });

  const login = useCallback<InputFormProps["onSubmit"]>(
    async ({ id, password }) => {
      try {
        await requestLogin({ variables: { email: id, password } });
        console.log(loginResponse.data);
        console.log(loginResponse.error);
      } catch (e) {
        console.log(e);
      }
    },
    [requestLogin, loginResponse]
  );

  return (
    <Section>
      <InputForm onSubmit={login} />
      <NavLink to="/signup">회원가입</NavLink>
    </Section>
  );
}

export default LoginContainer;

const Section = styled.section`
  border: 1px solid pink;
  padding: 5rem;

  & > a {
    margin-left: auto;
    display: block;
    width: fit-content;
    &:visited {
    }
  }
`;
