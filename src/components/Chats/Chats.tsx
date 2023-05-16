import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Message } from 'assets/icons/massage.svg';

export const Chats = () => (
  <StyledChats>
    <StyledChatsHeader>
      <StyledIconWrapper title="Новый чат">
        <Message />
      </StyledIconWrapper>
    </StyledChatsHeader>
    <StyledChatsBody>
      <StyledChatsText>
        Для отправки сообщения добавьте{' '}
        <StyledButtonText>новый чат</StyledButtonText>
      </StyledChatsText>
    </StyledChatsBody>
  </StyledChats>
);

const StyledChats = styled.div`
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const StyledChatsHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.625rem 1rem;
  background-color: ${({ theme }) => theme.colors.ATHENS_GRAY};
`;

const StyledIconWrapper = styled.span`
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
  }
  svg {
    fill: ${({ theme }) => theme.colors.SHUTTLE_GRAY};
  }
`;

const StyledChatsBody = styled.div``;

const StyledChatsText = styled.p`
  padding: 1rem 0.5rem;
  width: 100%;
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.SHUTTLE_GRAY};
`;

const StyledButtonText = styled.span`
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;
