import React from "react";
import styled from "@emotion/styled";

import SendForm from "components/chatting/SendForm";
import History from "components/chatting/MessageList";

function ChattingContainer() {
  return (
    <Wrapper>
      <History />
      <SendForm onSubmit={() => {}} />
    </Wrapper>
  );
}

export default ChattingContainer;

const Wrapper = styled.section`
  width: 25rem;
  height: 100vh;
  margin: 0 auto;
  background-color: whitesmoke;

  & > article {
    &:first-of-type {
      height: calc(100% - 3rem);
    }

    &:last-of-type {
      background-color: yellow;
      height: 3rem;
    }
  }
`;
