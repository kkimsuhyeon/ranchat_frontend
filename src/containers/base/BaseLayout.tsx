import React from "react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

function BaseLayout() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

export default BaseLayout;

const Wrapper = styled.section`
  width: 25rem;
  height: 100vh;
  margin: 0 auto;
  background-color: whitesmoke;
`;
