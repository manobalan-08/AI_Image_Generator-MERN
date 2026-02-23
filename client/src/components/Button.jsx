import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

const StyledButton = styled.div`
  border-radius: 10px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 16px;
  height: min-content;
  white-space: nowrap;

  @media (max-width: 600px) {
    padding: 8px 12px;
    font-size: 14px;
  }

  ${({ type, theme }) =>
    type === "secondary"
      ? `
  background: transparent;
  color: ${theme.primary};
  border: 1px solid ${theme.primary};
  &:hover {
    background: ${theme.primary + "11"};
  }
  `
      : `
  background: ${theme.primary};
  color: white;
  &:hover {
    background: ${theme.primary + "99"};
  }
  `}

  ${({ isDisabled }) =>
    isDisabled &&
    `
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
  `}

  ${({ $isLoading }) =>
    $isLoading &&
    `
  opacity: 0.8;
  cursor: not-allowed;
  `}

  ${({ $flex }) =>
    $flex &&
    `
    flex: 1;
  `}
`;

const Button = ({
  text,
  leftIcon,
  rightIcon,
  type,
  onClick,
  isDisabled,
  isLoading,
  flex,
}) => {
  return (
    <StyledButton
      onClick={!isDisabled && !isLoading ? onClick : null}
      type={type}
      isDisabled={isDisabled}
      $isLoading={isLoading}
      $flex={flex}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {rightIcon}
    </StyledButton>
  );
};

export default Button;