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

export interface IStoreContextValue {
  chatsData: {
    chats: string[];
    setChats: Dispatch<SetStateAction<string[]>> | null;
  };
  activeChatData: {
    activeChat: string;
    setActiveChat: Dispatch<SetStateAction<string>> | null;
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
};

const StoreContext = createContext<IStoreContextValue>(defaultValue);

export const StoreManager = ({ children }: IStoreManagerProps) => {
  const [chats, setChats] = useState<string[]>([]);
  const [activeChat, setActiveChat] = useState<string>('');

  const store: IStoreContextValue = useMemo(
    () => ({
      chatsData: { chats, setChats },
      activeChatData: { activeChat, setActiveChat },
    }),
    [chats, activeChat, setChats, setActiveChat],
  );

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStoreContextManager = () => useContext(StoreContext);
