import { Dispatch, ReactNode, SetStateAction } from 'react';
import { IAuth } from 'services/types/types';

export interface IStoreManagerProps {
  children?: ReactNode;
}

export interface IMessage {
  idMessage?: string;
  statusMessage?: string;
  textMessage?: string;
  date?: string;
  time?: string;
}

export interface IChat {
  chatId?: string;
  phone?: string;
  text?: string;
  messagesInfo?: IMessage[];
}

export interface IStoreContextValue {
  chats: IChat[];
  setChats: Dispatch<SetStateAction<IChat[]>> | null;
  activeChat: IChat;
  setActiveChat: Dispatch<SetStateAction<IChat>> | null;
  messages: IMessage[];
  setMessages: Dispatch<SetStateAction<IMessage[]>> | null;
  auth: IAuth;
  setAuth: Dispatch<SetStateAction<IAuth>> | null;
}
