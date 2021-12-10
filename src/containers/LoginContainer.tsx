import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { useLazyQuery } from "@apollo/client";

import { ResponseError } from "libs/class";

import { QUERY_REQUEST_TOKEN } from "graphqls/user";

import InputForm, { InputFormProps } from "components/login/InputForm";
import useUserInfo from "hooks/useUserInfo";

export interface LoginContainerProps {
  onSuccess: () => void;
}

function LoginContainer({ onSuccess }: LoginContainerProps) {
  const userInfo = useUserInfo();

  console.log(userInfo);

  const [requestLogin] = useLazyQuery<
    { requestToken: string },
    { email: string; password: string }
  >(QUERY_REQUEST_TOKEN);

  const login = useCallback<InputFormProps["onSubmit"]>(
    async ({ id, password }) => {
      try {
        const { data, error } = await requestLogin({
          variables: { email: id, password },
        });

        if (data) {
          const { requestToken } = data;
          localStorage.setItem("token", requestToken);
          onSuccess();
        }

        if (error && new ResponseError(error).code === "401") {
          console.log("아이디 / 비밀번호를 확인해주세요.");
        }
      } catch (e) {
        console.log(e);
      }
    },
    [requestLogin, onSuccess]
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
  padding: 4rem;

  & > article {
    margin-bottom: 1rem;
  }

  & > a {
    margin-left: auto;
    display: block;
    width: fit-content;
    &:visited {
    }
  }
`;
