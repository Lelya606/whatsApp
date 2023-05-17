import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Input } from 'components/Input/Input';
import { Card } from 'components/Сard/Card';
import { ReactComponent as Plus } from 'assets/icons/plus.svg';
import { useStoreContextManager } from 'context/store';

export const Chats = () => {
  const { chatsData, activeChatData } = useStoreContextManager();
  const { chats, setChats } = chatsData;
  const { activeChat, setActiveChat } = activeChatData;
  const [inputValue, setInputValue] = useState('');

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.currentTarget.value);

  const onClickInput = () => {
    setChats && inputValue && setChats(prev => [...prev, inputValue]);
    setInputValue('');
  };

  const onClickCard = useCallback(
    (title: string) => {
      setActiveChat && setActiveChat(title);
    },
    [chats],
  );

  const renderCards = useMemo(
    () =>
      chats.map(title => (
        <>
          <Card
            active={activeChat === title}
            title={title}
            onClick={onClickCard}
            key={title}
          />
          <StyledSeparator />
        </>
      )),
    [chats, activeChat],
  );

  return (
    <StyledChats>
      <StyledChatsHeader>
        <Input
          type="text"
          placeholder="Новый чат"
          onChange={onChangeInput}
          onKeyDown={onClickInput}
          value={inputValue}
        />
        <StyledIconWrapper onClick={onClickInput}>
          <Plus />
        </StyledIconWrapper>
      </StyledChatsHeader>
      <StyledChatsBody>
        {!!chats.length ? (
          renderCards
        ) : (
          <StyledChatsText>
            Для отправки сообщения добавьте{' '}
            <StyledButtonText>новый чат</StyledButtonText>
          </StyledChatsText>
        )}
      </StyledChatsBody>
    </StyledChats>
  );
};

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
  }
`;

const StyledChatsBody = styled.div`
  position: relative;
`;

const StyledChatsHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
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

const StyledSeparator = styled.div`
  width: 85%;
  margin: 0 auto;
  border-top: 1px solid ${({ theme }) => theme.colors.PORCELAIN};
`;
