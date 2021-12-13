import React from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";

import ChattingContainer from "containers/ChattingContainer";

function Chatting() {
  const { id = "" } = useParams();

  return (
    <Wrapper>
      <ChattingContainer id={id} />
    </Wrapper>
  );
}

export default Chatting;

const Wrapper = styled.section``;
