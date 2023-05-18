import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useStoreContextManager } from 'context/store';
import { chekPhoneNumber, getChants, getMessages } from 'services/chatsService';
import { changeDataChats, changeMessages } from 'utils/common';
import { IChat } from 'context/types';
import { CHAT_ID, ERROR_MESSAGE } from 'constants/common';

const { CHECK, UNUSED } = ERROR_MESSAGE;

export const useChats = () => {
  const {
    chats,
    setChats,
    activeChat,
    setActiveChat,
    auth,
    setAuth,
    setMessages,
  } = useStoreContextManager();
  const { idInstance, apiTokenInstance } = auth;
  const [inputValue, setInputValue] = useState('');
  const [stateChats, setStateChats] = useState<IChat[]>([]);

  useEffect(() => {
    !stateChats?.length && setStateChats(chats);
  }, [chats]);

  useEffect(() => {
    setAuth &&
      setAuth({
        idInstance: '1101821608',
        apiTokenInstance: '33432273d00747c2a6d7e9ddfe8120f318d53946bb7a48e7a6',
      });
  }, []);

  useEffect(() => {
    if (!idInstance || !apiTokenInstance) return;
    const getData = async () => {
      const data = await getChants(auth);
      const newData = changeDataChats(data);
      setChats && setChats(newData);
    };
    getData();
  }, [auth]);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setInputValue(value);
    if (chats && value.length >= 3) {
      const newChats = chats.filter(({ phone }) => phone.includes(value));
      setChats && setChats(newChats);
    }
    if (chats && value.length === 0) {
      setChats && stateChats && setChats(stateChats);
    }
  };

  const onClickInput = async () => {
    if (inputValue.length < 11 || inputValue.length > 13) {
      return alert(CHECK);
    }
    if (chats.length === 1) return;
    const { existsWhatsapp } = await chekPhoneNumber({
      phoneNumber: inputValue,
      ...auth,
    });
    if (!existsWhatsapp) {
      return alert(`${inputValue} ${UNUSED}`);
    }
    const data = {
      phone: `+${inputValue}`,
      chatId: `${inputValue}${CHAT_ID}`,
    };

    setChats && inputValue && setChats([data, ...stateChats]);
    setInputValue('');
  };

  const onClickCard = useCallback(
    async (data: IChat) => {
      setMessages && setMessages([]);
      const messages = await getMessages({ chatId: data.chatId, ...auth });
      if (!messages) return;
      const messagesInfo = changeMessages(messages);
      setMessages && setMessages(messagesInfo);
      setActiveChat && setActiveChat(data);
    },
    [chats],
  );

  return {
    chats,
    activeChat,
    inputValue,
    onChangeInput,
    onClickInput,
    onClickCard,
  };
};
