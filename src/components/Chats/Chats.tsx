import React from 'react';
import styled from 'styled-components';
import { Input } from 'components/Input/Input';
import { ReactComponent as Plus } from 'assets/icons/plus.svg';

export const Chats = () => (
  <StyledChats>
    <StyledChatsHeader>
      <Input type="tel" placeholder="Новый чат" />
      <StyledIconWrapper>
        <Plus />
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
  border-right: 1px solid ${({ theme }) => theme.colors.LIMITED_SPRUCE};
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const StyledIconWrapper = styled.span`
  &:hover {
    cursor: pointer;
  }
  svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: ${({ theme }) => theme.colors.SHUTTLE_GRAY};
    path {
      fill: ${({ theme }) => theme.colors.SHUTTLE_GRAY};
    }
  }
`;

const StyledChatsBody = styled.div`
  position: relative;
`;

const StyledChatsHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  column-gap: 0.5rem;
  background-color: ${({ theme }) => theme.colors.WHITE};
  box-shadow: ${({ theme }) => theme.boxShadow.light};

  svg {
    margin-top: 0.5rem;
  }
`;

const StyledChatsText = styled.p`
  padding: 1rem 0.5rem;
  width: 100%;
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.SHUTTLE_GRAY};
`;

const StyledButtonText = styled.span`
  &:hover {
    cursor: pointer;
  }
`;
