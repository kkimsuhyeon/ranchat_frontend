import React, { useCallback, useRef } from "react";
import styled from "@emotion/styled";

export interface OverlayProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

function Overlay({ children, isOpen, onClose }: OverlayProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const mouseDownRef = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      e.preventDefault();

      onClose && onClose();
    },
    [onClose]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLElement>) => {
    mouseDownRef.current = e.target as HTMLElement;
  }, []);

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (
        e.target === overlayRef.current &&
        mouseDownRef.current === overlayRef.current
      )
        handleClose(e);
    },
    [handleClose]
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "Escape") handleClose(e);
    },
    [handleClose]
  );

  return (
    <Wrapper
      isOpen={isOpen}
      ref={overlayRef}
      onKeyPress={handleKeyPress}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </Wrapper>
  );
}

export default Overlay;

const Wrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
