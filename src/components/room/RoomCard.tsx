import React from "react";
import styled from "@emotion/styled";
import moment from "moment";

export interface RoomCardProps {
  id: number;
  message: string;
  updatedAt: Date;
  onClick: () => void;
}

function RoomCard({ id, message, updatedAt, onClick }: RoomCardProps) {
  return (
    <Wrapper onClick={onClick}>
      <div>{id}</div>
      <div>{message}</div>
      <div>{moment(updatedAt).format("YY-MM-DD")}</div>
    </Wrapper>
  );
}

export default RoomCard;

const Wrapper = styled.div`
  width: 100%;
  height: 5rem;
  background-color: rgba(255, 0, 128, 0.3);
  padding: 0.7rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 0, 128, 0.4);
  }

  & > div {
    &:first-of-type {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    &:nth-of-type(2) {
      margin-left: 0.9rem;
      opacity: 0.5;
    }

    &:last-of-type {
      font-size: 0.8rem;
      width: fit-content;
      margin-left: auto;
      margin-right: 0.5rem;
    }
  }
`;
