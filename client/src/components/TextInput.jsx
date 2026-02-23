import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  padding: 0px 4px;
  text-transform: uppercase;
`;

const OutlinedInput = styled.div`
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.text_secondary + "50"};
  background-color: transparent;
  color: ${({ theme }) => theme.text_primary};
  outline: none;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 14px;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text_primary};
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  font-size: 14px;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text_primary};
  &:focus {
    outline: none;
  }
`;

const Error = styled.p`
  font-size: 12px;
  margin: 0px 4px;
  color: ${({ theme }) => theme.error || "#ff0000"};
`;

const TextInput = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  textArea,
  rows,
  columns,
  error,
  type,
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <OutlinedInput>
        {textArea ? (
          <TextArea
            name={name}
            rows={rows}
            columns={columns}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e)}
          />
        ) : (
          <Input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e)}
          />
        )}
      </OutlinedInput>
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default TextInput;