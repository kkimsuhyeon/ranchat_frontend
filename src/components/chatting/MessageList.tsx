import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";

import MessageCard, { MessageCardProps } from "components/chatting/MessageCard";
import Spinner from "components/common/Spinner";

export interface MessageListProps {
  messages?: Array<MessageCardProps>;
  loading: boolean;
}

function MessageList({ messages, loading }: MessageListProps) {
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (articleRef.current !== null)
      articleRef.current.scrollTo(0, articleRef.current.scrollHeight);
  }, [messages]);

  return (
    <article ref={articleRef}>
      {loading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        messages?.map(({ text, type }, index) => (
          <MessageCard key={`message-${index}`} type={type} text={text} />
        ))
      )}
    </article>
  );
}

export default MessageList;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;
