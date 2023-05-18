import React, { ChangeEvent, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { ReactComponent as Send } from 'assets/icons/send.svg';
import { ReactComponent as Check } from 'assets/icons/check.svg';
import { ReactComponent as CheckOne } from 'assets/icons/checkOne.svg';
import { useStoreContextManager } from 'context/store';
import { Card, StyledCard } from 'components/Сard/Card';
import { Input, StyledInput } from 'components/Input/Input';
import { StyledIconWrapper } from 'components/Chats/Chats';
import { sendMessage } from 'services/messagesService';
import { STATUS_MESSAGE } from 'constants/common';
import { changeFormatDate, changeTime } from 'utils/common';

const { READ, DEL, PEN } = STATUS_MESSAGE;

export const DialogWindow = () => {
  const { activeChat, messages, auth, setMessages } = useStoreContextManager();
  const { chatId, phone } = activeChat;
  const [inputValue, setValueInput] = useState('');

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) =>
    setValueInput(event.currentTarget.value);

  const onClickSend = async () => {
    const data = {
      data: {
        chatId,
        message: inputValue,
      },
      ...auth,
    };
    const { idMessage } = await sendMessage(data);
    const message = {
      idMessage,
      statusMessage: PEN,
      textMessage: inputValue,
      date: changeFormatDate(new Date()),
      time: changeTime(new Date()),
    };
    setMessages && setMessages(prev => [message, ...prev]);
    setValueInput('');
  };

  const renderMessage = useMemo(
    () =>
      messages.map(({ idMessage, statusMessage, textMessage, date, time }) => (
        <StyledMessageContainer key={idMessage ?? textMessage}>
          <StyledMessage incoming={!!statusMessage}>
            {textMessage}
            {statusMessage && (
              <StyledIconMessage statusMessage={statusMessage}>
                {statusMessage === DEL || statusMessage === READ ? (
                  <Check />
                ) : (
                  <CheckOne />
                )}
              </StyledIconMessage>
            )}
          </StyledMessage>
          <StyledDateWrapper>
            <StyledDate>{date}</StyledDate>
            <StyledTime>{time}</StyledTime>
          </StyledDateWrapper>
        </StyledMessageContainer>
      )),
    [messages],
  );

  return (
    <StyledDialogWindow activeChat={!!chatId}>
      {chatId ? (
        <StyledDialog>
          <StyledHeader>
            <Card active title={phone} />
          </StyledHeader>
          <StyLedBodyWrapper>
            <StyLedBody>{!!messages.length && renderMessage}</StyLedBody>
          </StyLedBodyWrapper>
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

const StyLedBodyWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
  height: calc(100vh - 10.375rem);
  background-color: ${({ theme }) => theme.colors.BLACK_HAZE};

  ::-webkit-scrollbar {
    width: 0.375rem;
    height: 0.375rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.AZTEC};
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.WHITE};
    opacity: 0.1%;
  }
`;

const StyLedBody = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  row-gap: 0.5rem;
  padding: 0 1.5rem 1.25rem;
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

const StyledMessageContainer = styled.div`
  display: flex;
  justify-content: end;
  column-gap: 1rem;
`;

const StyledMessage = styled.div<{ incoming: boolean }>`
  padding: 0.5rem;
  align-self: ${({ incoming }) => (incoming ? 'flex-end;' : 'flex-start;')});
  background-color: ${({ theme, incoming }) =>
    incoming ? theme.colors.SNOW_FLURRY : theme.colors.WHITE};
  box-shadow: ${({ theme }) => theme.boxShadow.message};
  border-radius: 0.4688rem;
  color: ${({ theme }) => theme.colors.BUNKER};
`;

const StyledIconMessage = styled.span<{ statusMessage: string }>`
  margin-left: 0.5rem;
  svg {
    fill: ${({ theme, statusMessage }) =>
      statusMessage === READ
        ? theme.colors.PICTON_BLUE
        : theme.colors.SHUTTLE_GRAY};
  }
`;

const StyledDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.01rem;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.SHUTTLE_GRAY};
`;

const StyledDate = styled.p``;
const StyledTime = styled.p``;
