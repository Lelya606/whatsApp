import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkMessages, deleteMessage } from 'services/messagesService';
import { useStoreContextManager } from 'context/store';
import { IChat, IMessage } from 'context/types';
import { useAuth } from 'context/auth';
import { changeFormatDate, changeTime } from 'utils/common';
import {
  AUTH,
  AUTH_STATUS,
  ROUTS,
  STATUS_MESSAGE,
  UNKNOWN_MESSAGE,
} from 'constants/common';
import { AuthType } from 'types/authType';
import { deleteLocalStorage } from 'services/storageService';

interface INewMessage {
  data?: IChat & IMessage;
  receiptId: string;
}

const { READ } = STATUS_MESSAGE;
const { AUTHORIZED } = AuthType;
const { API_TOKEN_INSTANCE, ID_INSTANCE } = AUTH;
const { LOGIN } = ROUTS;

export const useGetNotification = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { activeChat } = useStoreContextManager();
  const [newMessage, setNewMessage] = useState<INewMessage | null>(null);

  const logOut = (stateInstance: AuthType, receiptId: string) => {
    deleteMessage({ receiptId, ...auth });
    deleteLocalStorage(API_TOKEN_INSTANCE);
    deleteLocalStorage(ID_INSTANCE);
    setAuth &&
      setAuth({
        apiTokenInstance: '',
        idInstance: '',
      });
    navigate(LOGIN);
    alert(AUTH_STATUS[stateInstance as AuthType]);
  };

  const changeMessages = (
    dataMessage: { textMessage?: string },
    idMessage: string,
    timestamp: number,
    chatId: string,
  ) => {
    const message =
      dataMessage && dataMessage.textMessage
        ? dataMessage.textMessage
        : UNKNOWN_MESSAGE;
    const date = new Date(timestamp * 1000);
    const statusMessage = chatId === activeChat.chatId ? READ : undefined;
    return {
      idMessage,
      textMessage: message,
      date: changeFormatDate(date),
      time: changeTime(date),
      statusMessage,
    };
  };

  const changeDataChats = (
    chatId: string,
    dataMessage: { textMessage?: string },
  ) => {
    const message =
      dataMessage && dataMessage.textMessage
        ? dataMessage.textMessage
        : UNKNOWN_MESSAGE;
    const [phone] = chatId.split('@');
    return {
      chatId,
      phone: `+${phone}`,
      text: message,
    };
  };

  const check = async () => {
    const response = await checkMessages(auth);
    if (!response) return setNewMessage(null);
    const { body, receiptId } = response;
    const {
      messageData,
      senderData,
      idMessage,
      timestamp,
      instanceData,
      status,
      chatId,
      stateInstance,
    } = body;
    let data;
    if (stateInstance && stateInstance !== AUTHORIZED) {
      return logOut(stateInstance, receiptId);
    }
    if (messageData && senderData && senderData.chatId === activeChat.chatId) {
      data = changeMessages(
        messageData.textMessageData,
        idMessage,
        timestamp,
        instanceData.wid,
      );
    }
    if (
      senderData &&
      messageData &&
      !status &&
      senderData.chatId !== activeChat.chatId
    ) {
      data = changeDataChats(senderData.chatId, messageData.textMessageData);
    }
    if (status && chatId === activeChat.chatId) {
      data = {
        statusMessage: status,
        idMessage,
      };
    }
    setNewMessage({
      data,
      receiptId,
    });
  };

  useEffect(() => {
    const messages = setInterval(() => {
      check();
    }, 10000);

    return () => clearInterval(messages);
  });

  return newMessage;
};
