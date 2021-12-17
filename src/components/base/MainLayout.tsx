import React from "react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

export default MainLayout;

const Wrapper = styled.section`
  width: 25rem;
  height: 100vh;
  margin: 0 auto;
  background-color: whitesmoke;
`;
