import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  IChat,
  IMessage,
  IStoreContextValue,
  IStoreManagerProps,
} from 'context/types';

const defaultValue = {
  chats: [],
  setChats: null,
  activeChat: {
    chatId: '',
    phone: '',
  },
  setActiveChat: null,
  messages: [],
  setMessages: null,
};

export const StoreContext = createContext<IStoreContextValue>(defaultValue);

export const StoreManager = ({ children }: IStoreManagerProps) => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [activeChat, setActiveChat] = useState<IChat>(defaultValue.activeChat);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const store: IStoreContextValue = useMemo(
    () => ({
      chats,
      setChats,
      activeChat,
      setActiveChat,
      messages,
      setMessages,
    }),
    [chats, setChats, activeChat, setActiveChat, messages, setMessages],
  );
  console.log(store, 'store');
  console.log(messages, 'messages');
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStoreContextManager = () => useContext(StoreContext);
