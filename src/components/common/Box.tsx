import React from "react";
import styled, { CSSObject } from "@emotion/styled";

interface DivProps {
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  flex?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: CSSObject["backgroundColor"];
}

export const Div = styled.div<DivProps>`
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `width: ${height}`};
  ${({ minWidth }) => minWidth && `minWidth: ${minWidth}`};
  ${({ maxWidth }) => maxWidth && `maxWidth: ${maxWidth}`};
  ${({ flex }) => flex && `flex: ${flex}`};
  ${({ margin }) => margin && `margin: ${margin}`};
  ${({ padding }) => padding && `padding: ${padding}`};
  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${backgroundColor}`};
`;
