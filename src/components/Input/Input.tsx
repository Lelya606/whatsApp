import React from 'react';
import styled from 'styled-components';

interface IInputProps {
  type: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value?: string;
  onKeyDown?: () => void;
}

export const Input = ({
  type,
  placeholder,
  onChange,
  onKeyDown,
  value,
}: IInputProps) => {
  const handleKeyDown = (key: string) => {
    if (key === 'Enter') onKeyDown && onKeyDown();
  };

  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      onChange={event => onChange(event.currentTarget.value)}
      value={value}
      onKeyDown={event => handleKeyDown(event.key)}
    />
  );
};

export const StyledInput = styled.input`
  padding: 0.5rem 1.5rem;
  width: 100%;
  border: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.SHUTTLE_GRAY};
  background-color: ${({ theme }) => theme.colors.ATHENS_GRAY};
  border-radius: 0.5rem;

  :focus {
    border-color: ${({ theme }) => theme.colors.ATHENS_GRAY};
    box-shadow: none;
    outline: none;
  }

  ::placeholder {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.SHUTTLE_GRAY};
  }

  ::-webkit-inner-spin-button {
    appearance: none;
  }
`;
