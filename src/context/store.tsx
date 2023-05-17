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
  incoming: boolean;
}

export interface IChat {
  chatId: string;
  phone: string;
}

export interface IStoreContextValue {
  chatsData: {
    chats: IChat[];
    setChats: Dispatch<SetStateAction<IChat[]>> | null;
  };
  activeChatData: {
    activeChat: IChat;
    setActiveChat: Dispatch<SetStateAction<IChat>> | null;
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
    activeChat: {
      chatId: '',
      phone: '',
    },
    setActiveChat: null,
  },
  messagesData: {
    messages: [],
    setMessages: null,
  },
};

const StoreContext = createContext<IStoreContextValue>(defaultValue);

export const StoreManager = ({ children }: IStoreManagerProps) => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [activeChat, setActiveChat] = useState<IChat>(
    defaultValue.activeChatData.activeChat,
  );
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
