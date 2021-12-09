import React, { useEffect, useRef } from "react";

import MessageCard, { MessageCardProps } from "components/chatting/MessageCard";

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
      {loading
        ? "loading..."
        : messages?.map((message) => (
            <MessageCard type={message.type} text={message.text} />
          ))}
    </article>
  );
}
export default MessageList;
