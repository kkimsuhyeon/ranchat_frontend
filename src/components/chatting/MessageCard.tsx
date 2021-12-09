import React from "react";
import styled from "@emotion/styled";

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
  background-color: pink;
  border-radius: 10px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;

  &::after {
    border-top: 6px solid transparent;
    border-left: ${({ type }) => (type === "receive" ? "6px" : "0px")} solid
      pink;
    border-right: ${({ type }) => (type === "send" ? "6px" : "0px")} solid pink;
    border-bottom: 6px solid transparent;
    content: "";
    position: absolute;
    top: 7px;
    left: -6px;
  }
`;
