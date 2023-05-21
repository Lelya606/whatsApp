import { useCallback, useEffect, useState } from 'react';
import { useStoreContextManager } from 'context/store';
import { chekPhoneNumber, getChants, getMessages } from 'services/chatsService';
import { changeDataChats, changeMessages } from 'utils/common';
import { IChat, IMessage } from 'context/types';
import { useAuth } from 'context/auth';
import { CHAT_ID, ERROR_MESSAGE } from 'constants/common';
import { useGetNotification } from 'hooks/useGetNotification';
import { deleteMessage } from 'services/messagesService';

const { CHECK, UNUSED } = ERROR_MESSAGE;

export const useChats = () => {
  const { chats, setChats, activeChat, setActiveChat, messages, setMessages } =
    useStoreContextManager();
  const { auth } = useAuth();
  const { idInstance, apiTokenInstance } = auth;
  const [inputValue, setInputValue] = useState('');
  const [stateChats, setStateChats] = useState<IChat[]>([]);
  const newMessage = useGetNotification();

  useEffect(() => {
    if (!newMessage) return;
    const { data, receiptId } = newMessage;
    if (data) {
      const { phone, statusMessage, textMessage, idMessage, chatId } = data;
      if (phone && chatId) setDataChats(data, chatId);
      if (textMessage) addMessageActiveChat(data);
      if (statusMessage && idMessage && !textMessage) {
        changeMessageActiveChat(data, idMessage, statusMessage);
      }
    }

    deleteMessage({ receiptId, ...auth });
  }, [newMessage]);

  useEffect(() => {
    !stateChats?.length && setStateChats(chats);
  }, [chats]);

  useEffect(() => {
    if (!idInstance || !apiTokenInstance) return;
    const getData = async () => {
      const data = await getChants(auth);
      if (!data) return;
      const newData = changeDataChats(data);
      if (!newData) return;
      setChats && setChats(newData);
    };
    getData();
  }, [auth]);

  const setDataChats = (data: IChat, chatId: string) => {
    const indexChat = chats.findIndex(el => el.chatId === chatId);
    if (indexChat !== -1) {
      const chatsFilter = chats.filter((el, index) => index !== indexChat);
      const newChats = [data, ...chatsFilter];
      setChats && setChats(newChats);
      setStateChats(newChats);
      return;
    }
    setChats && !chats.length && setChats([data]);
  };

  const addMessageActiveChat = (data: IMessage) => {
    if (!messages.length) {
      setMessages && setMessages([data]);
      return;
    }
    const findMessage = messages.find(el => el.idMessage === data.idMessage);
    if (findMessage) return;
    setMessages && setMessages(prev => [data, ...prev]);
  };

  const changeMessageActiveChat = (
    data: IMessage,
    idMessage: string,
    statusMessage: string,
  ) => {
    const messageInfo = messages.map(message => {
      if (message.idMessage === idMessage) {
        return { ...message, statusMessage };
      }
      return message;
    });
    setMessages && setMessages(messageInfo);
  };

  const onChangeInput = (value: string) => {
    setInputValue(value);
    if (chats && value.length >= 3) {
      const newChats = chats.filter(({ phone }) => phone?.includes(value));
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
      if (!data.chatId) return;
      const allMessages = await getMessages({ chatId: data.chatId, ...auth });
      if (!allMessages) return;
      const messagesInfo = changeMessages(allMessages);
      if (!messagesInfo) return;
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
