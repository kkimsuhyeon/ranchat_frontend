import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export interface MessageCardProps {
  type: "send" | "receive";
  text: string;
}

function MessageCard({ type, text }: MessageCardProps) {
  return (
    <Wrapper type={type}>
      <div>{text}</div>
    </Wrapper>
  );
}

export default MessageCard;

const Wrapper = styled.div<{ type: MessageCardProps["type"] }>`
  position: relative;
  width: fit-content;
  min-width: 3rem;
  min-height: 2rem;
  background-color: ${({ type }) => (type === "send" ? "pink" : "white")};
  border-radius: 10px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  margin-left: ${({ type }) => (type === "send" ? "auto" : 0)};

  &::after {
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    content: "";
    position: absolute;
    top: 8px;

    ${({ type }) =>
      type === "send"
        ? css`
            border-right: 0px solid pink;
            border-left: 6px solid pink;
            right: -6px;
          `
        : css`
            border-left: 0px solid white;
            border-right: 6px solid white;
            left: -6px;
          `}
  }
`;
