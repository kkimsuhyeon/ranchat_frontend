import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/styled";

import Spinner from "components/common/Spinner";

export interface Structure<T> {
  title: string;
  id: keyof T;
  flex: string;
  align?: CSSObject["textAlign"];
}

export interface TableProps<T> {
  structure: Array<Structure<T>>;
  data?: Array<T>;
  onClick?: (data: T) => void;
}

function Table<T>({ data, structure, onClick }: TableProps<T>) {
  const key = useMemo(() => structure[0].id, [structure]);

  const header = useMemo(() => {
    return (
      <Header>
        {structure.map(({ flex, id, title, align }) => (
          <Data key={id as string} align={align} flexSetting={flex}>
            {title}
          </Data>
        ))}
      </Header>
    );
  }, [structure]);

  const body = useMemo(() => {
    if (data === undefined) {
      return (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      );
    }

    if (data.length === 0) {
      return <SpinnerWrapper>정보가 존재하지 않습니다.</SpinnerWrapper>;
    }

    return (
      <Body>
        {data.map((item) => (
          <div key={`${item[key]}`}>
            {structure.map(({ flex, id, title, align }) => (
              <Data
                key={id as string}
                align={align}
                flexSetting={flex}
                onClick={onClick ? () => onClick(item) : undefined}
              >
                {item[id]}
              </Data>
            ))}
          </div>
        ))}
      </Body>
    );
  }, [data, structure, onClick, key]);

  return (
    <TableWrapper>
      {header}
      {body}
    </TableWrapper>
  );
}

export default Table;

const TableWrapper = styled.div`
  border-top: 1px solid black;
  border-left: 1px solid black;
`;

const Header = styled.div`
  display: flex;
  height: 2rem;
  line-height: 2rem;
`;

const Body = styled.div`
  & > div {
    display: flex;
    height: 2rem;
    line-height: 2rem;
  }
`;

const Data = styled.div<{
  align: CSSObject["alignItems"];
  flexSetting: string;
  onClick?: TableProps<any>["onClick"];
}>`
  flex: ${({ flexSetting }) => flexSetting ?? "1"};
  text-align: ${({ align }) => align ?? "center"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  padding: 0 0.2rem;
  cursor: ${({ onClick }) => (onClick ? "pointer" : "initial")};
  &::hover {
    background-color: ${({ onClick }) => (onClick ? "pink" : "initial")};
  }
`;

const SpinnerWrapper = styled.div`
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;
