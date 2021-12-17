import React from "react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

function CenterLayout() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

export default CenterLayout;

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;
