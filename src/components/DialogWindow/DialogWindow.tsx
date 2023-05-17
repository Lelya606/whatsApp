import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { ReactComponent as Send } from 'assets/icons/send.svg';
import { useStoreContextManager } from 'context/store';
import { Card, StyledCard } from 'components/Сard/Card';
import { Input, StyledInput } from 'components/Input/Input';
import { StyledIconWrapper } from 'components/Chats/Chats';
import { changeFormatDate } from 'utils/common';

export const DialogWindow = () => {
  const { activeChatData, messagesData } = useStoreContextManager();
  const { activeChat } = activeChatData;
  const { setMessages } = messagesData;
  const [inputValue, setValueInput] = useState('');

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) =>
    setValueInput(event.currentTarget.value);

  const onClickSend = () => {
    const message = {
      message: inputValue,
      date: changeFormatDate(new Date()),
    };
    setMessages && inputValue && setMessages(prev => [...prev, message]);
    setValueInput('');
  };

  return (
    <StyledDialogWindow activeChat={!!activeChat}>
      {activeChat ? (
        <StyledDialog>
          <StyledHeader>
            <Card active title={activeChat} />
          </StyledHeader>
          <StyLedBody />
          <StyledFooter>
            <Input
              type="text"
              onChange={onChangeInput}
              onKeyDown={onClickSend}
              placeholder="Введите сообщение"
              value={inputValue}
            />
            <StyledIconWrapper onClick={onClickSend}>
              <Send />
            </StyledIconWrapper>
          </StyledFooter>
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
    border-bottom: 1px solid ${({ theme }) => theme.colors.LIMITED_SPRUCE};

    svg {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;

const StyLedBody = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.BLACK_HAZE};
`;

const StyledFooter = styled.div`
  display: flex;
  column-gap: 1rem;
  padding: 0.5rem 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.LIMITED_SPRUCE};

  ${StyledInput} {
    padding: 0.6rem 1rem;
    background-color: ${({ theme }) => theme.colors.WHITE};
  }

  svg {
    margin-top: 0.5rem;
  }
`;
