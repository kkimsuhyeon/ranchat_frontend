import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export interface SelectBoxProps<T> {
  list: T;
  defaultValue: keyof T | undefined;
  clear?: boolean;
  onChange: (value: keyof T | undefined) => void;
}

function SelectBox<T>({
  defaultValue,
  list,
  clear = false,
  onChange,
}: SelectBoxProps<T>) {
  const [value, setValue] = useState<
    SelectBoxProps<T>["defaultValue"] | undefined
  >(defaultValue);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { id } = e.target as HTMLDivElement;
      setValue(id as keyof T);
      onChange(id as keyof T);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    setValue(undefined);
    onChange(undefined);
  }, [onChange]);

  return (
    <Wrapper>
      <div>
        <p>bio</p>
        {clear && (
          <button type="button" onClick={handleClear}>
            삭제
          </button>
        )}
      </div>
      <SelectWrapper select={String(value)}>
        {Object.entries(list).map(([key, value]) => (
          <div key={key} id={key} onClick={handleClick}>
            {value}
          </div>
        ))}
      </SelectWrapper>
    </Wrapper>
  );
}

export default SelectBox;

const Wrapper = styled.div`
  & > div:first-of-type {
    display: flex;
    margin-bottom: 0.3rem;
    align-items: center;

    & > button {
      padding: 0.2rem;
      background-color: rgba(255, 0, 100, 0.25);
      border-radius: 0.5rem;
      margin-left: 0.5rem;
    }
  }
`;

const SelectWrapper = styled.div<{ select: string }>`
  display: flex;
  width: 100%;
  border-top: 1px solid black;
  border-right: 1px solid black;

  & > div {
    width: 50%;
    border-bottom: 1px solid black;
    border-left: 1px solid black;
    padding: 0.7rem;
    text-align: center;
    cursor: pointer;

    ${({ select }) => css`
      &[id=${select}] {
        background-color: rgba(255, 0, 100, 0.25);
      }
    `}
  }
`;
