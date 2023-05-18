import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useStoreContextManager } from 'context/store';
import { chekPhoneNumber, getChants, getMessages } from 'services/chatsService';
import { changeDataChats, changeMessages } from 'utils/common';
import { IChat } from 'context/types';

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
    setInputValue(event.currentTarget.value);
  };

  const onClickInput = async () => {
    if (inputValue.length < 11 || inputValue.length > 13) {
      alert('Проверьте введенный номер');
      return;
    }
    const { existsWhatsapp } = await chekPhoneNumber({
      phoneNumber: inputValue,
      ...auth,
    });
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
    async (data: IChat) => {
      setMessages && setMessages([]);
      const messages = await getMessages({ chatId: data.chatId, ...auth });
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
