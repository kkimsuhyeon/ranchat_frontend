import React from "react";
import styled from "@emotion/styled";

export interface CreateButtonProps {
  onClick: () => void;
}

function CreateButton({ onClick }: CreateButtonProps) {
  return (
    <Wrapper onClick={onClick}>
      <div>+</div>
    </Wrapper>
  );
}

export default CreateButton;

const Wrapper = styled.span`
  position: fixed;
  background-color: pink;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  text-align: center;
  line-height: 3rem;
`;
