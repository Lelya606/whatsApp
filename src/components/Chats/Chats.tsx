import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Input } from 'components/Input/Input';
import { Card } from 'components/Сard/Card';
import { ReactComponent as Plus } from 'assets/icons/plus.svg';
import { IChat, useStoreContextManager } from 'context/store';
import { chekPhoneNumber } from 'services/messagesService';

export const Chats = () => {
  const { chatsData, activeChatData } = useStoreContextManager();
  const { chats, setChats } = chatsData;
  const { activeChat, setActiveChat } = activeChatData;
  const [inputValue, setInputValue] = useState('');

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const onClickInput = async () => {
    if (inputValue.length < 11 || inputValue.length > 13) {
      alert('Проверьте введенный номер');
      return;
    }
    const { existsWhatsapp } = await chekPhoneNumber(
      inputValue,
      '1101821608',
      '33432273d00747c2a6d7e9ddfe8120f318d53946bb7a48e7a6',
    );
    if (!existsWhatsapp) {
      alert(`${inputValue} пока не использует WhatsApp`);
      return;
    }
    const data = {
      phone: `+${inputValue}`,
      chatId: `${inputValue}@c.us`,
    };
    setChats && inputValue && setChats(prev => [...prev, data]);
    setInputValue('');
  };

  const onClickCard = useCallback(
    (data: IChat) => {
      setActiveChat && setActiveChat(data);
    },
    [chats],
  );

  const renderCards = useMemo(
    () =>
      chats.map(({ phone, chatId }) => (
        <div key={chatId}>
          <Card
            active={activeChat.phone === phone}
            title={phone}
            onClick={title => onClickCard({ phone: title, chatId })}
          />
          <StyledSeparator />
        </div>
      )),
    [chats, activeChat],
  );

  return (
    <StyledChats>
      <StyledChatsHeader>
        <Input
          type="number"
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

export const StyledIconWrapper = styled.span`
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

export const StyledChatsHeader = styled.div`
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
