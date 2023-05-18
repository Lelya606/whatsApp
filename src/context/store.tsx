import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  IChat,
  IMessage,
  IStoreContextValue,
  IStoreManagerProps,
} from 'context/types';
import { IAuth } from 'services/types/types';

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
  auth: {
    apiTokenInstance: '',
    idInstance: '',
  },
  setAuth: null,
};

const StoreContext = createContext<IStoreContextValue>(defaultValue);

export const StoreManager = ({ children }: IStoreManagerProps) => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [activeChat, setActiveChat] = useState<IChat>(defaultValue.activeChat);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [auth, setAuth] = useState<IAuth>(defaultValue.auth);
  const state = [
    chats,
    activeChat,
    setChats,
    setActiveChat,
    messages,
    setMessages,
    auth,
    setAuth,
  ];

  const store: IStoreContextValue = useMemo(
    () => ({
      chats,
      setChats,
      activeChat,
      setActiveChat,
      messages,
      setMessages,
      auth,
      setAuth,
    }),
    state,
  );

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStoreContextManager = () => useContext(StoreContext);
