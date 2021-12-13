import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

function Spinner() {
  return <Spin />;
}

export default Spinner;

const spin = keyframes`
0%{ transform: rotate(0deg);}
100%{ transform: rotate(360deg);}
`;

const Spin = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${spin} 1s ease-in-out infinite;
`;
