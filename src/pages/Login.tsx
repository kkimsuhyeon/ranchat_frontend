import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import LoginContainer from "containers/LoginContainer";

function Login() {
  const navigate = useNavigate();

  const goToMain = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Section>
      <LoginContainer onSuccess={goToMain} />
    </Section>
  );
}

export default Login;

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
