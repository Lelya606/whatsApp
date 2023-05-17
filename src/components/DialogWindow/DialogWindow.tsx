import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { useStoreContextManager } from 'context/store';
import { Card, StyledCard } from 'components/Сard/Card';

export const DialogWindow = () => {
  const { activeChatData } = useStoreContextManager();
  const { activeChat } = activeChatData;

  return (
    <StyledDialogWindow activeChat={!!activeChat}>
      {activeChat ? (
        <StyledDialog>
          <StyledHeader>
            <Card active title={activeChat} text=",skf d 11.11" />
          </StyledHeader>
          <StyLedBody>1</StyLedBody>
        </StyledDialog>
      ) : (
        <StyledWrapper>
          <Logo />
          <StyledTitle>WhatsApp Web</StyledTitle>
        </StyledWrapper>
      )}
    </StyledDialogWindow>
  );
};

const StyledDialogWindow = styled.div<{ activeChat: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ activeChat }) => !activeChat && '1.75rem'};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.PORCELAIN};
`;

const StyledTitle = styled.h1`
  text-align: center;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.RIVER_BED};
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 20px;
`;

const StyledDialog = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 100%;
  height: 100%;
`;

const StyledHeader = styled.div`
  ${StyledCard} {
    pointer-events: none;
    padding: 0.75rem 1rem;

    svg {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;

const StyLedBody = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.WHITE};
`;
