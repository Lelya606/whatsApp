import React from 'react';
import styled from 'styled-components';

interface IInputProps {
  type: string;
  placeholder?: string;
}

export const Input = ({ type, placeholder }: IInputProps) => (
  <StyledInput type={type} placeholder={placeholder} />
);

const StyledInput = styled.input`
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
`;
