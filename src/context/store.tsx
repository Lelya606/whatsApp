import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

export interface IStoreManagerProps {
  children?: ReactNode;
}

export interface IMessage {
  date: string;
  message: string;
}

export interface IStoreContextValue {
  chatsData: {
    chats: string[];
    setChats: Dispatch<SetStateAction<string[]>> | null;
  };
  activeChatData: {
    activeChat: string;
    setActiveChat: Dispatch<SetStateAction<string>> | null;
  };
  messagesData: {
    messages: IMessage[];
    setMessages: Dispatch<SetStateAction<IMessage[]>> | null;
  };
}

const defaultValue = {
  chatsData: {
    chats: [],
    setChats: null,
  },
  activeChatData: {
    activeChat: '',
    setActiveChat: null,
  },
  messagesData: {
    messages: [],
    setMessages: null,
  },
};

const StoreContext = createContext<IStoreContextValue>(defaultValue);

export const StoreManager = ({ children }: IStoreManagerProps) => {
  const [chats, setChats] = useState<string[]>([]);
  const [activeChat, setActiveChat] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const state = [
    chats,
    activeChat,
    setChats,
    setActiveChat,
    messages,
    setMessages,
  ];

  const store: IStoreContextValue = useMemo(
    () => ({
      chatsData: { chats, setChats },
      activeChatData: { activeChat, setActiveChat },
      messagesData: { messages, setMessages },
    }),
    state,
  );

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStoreContextManager = () => useContext(StoreContext);
