import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';

export const DialogWindow = () => (
  <StyledDialogWindow>
    <StyledWrapper>
      <Logo />
      <StyledTitle>WhatsApp Web</StyledTitle>
    </StyledWrapper>
  </StyledDialogWindow>
);

const StyledDialogWindow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.75rem;
  height: 100%;
  border-left-width: 1px;
  border-left-color: ${({ theme }) => theme.colors.PORCELAIN};
  border-left-style: solid;
  background-color: ${({ theme }) => theme.colors.PORCELAIN};
`;

const StyledTitle = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.RIVER_BED};
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 20px;
`;
