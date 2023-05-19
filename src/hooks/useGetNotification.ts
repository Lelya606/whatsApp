import { useEffect, useState } from 'react';
import { checkMessages } from 'services/messagesService';
import { useStoreContextManager } from 'context/store';
import { IChat, IMessage } from 'context/types';
import { changeFormatDate, changeTime } from 'utils/common';
import { STATUS_MESSAGE } from 'constants/common';

interface INewMessage {
  data?: IChat & IMessage;
  receiptId: string;
}

const { READ } = STATUS_MESSAGE;

export const useGetNotification = () => {
  const { activeChat, auth } = useStoreContextManager();
  const { apiTokenInstance, idInstance } = auth;
  const [newMessage, setNewMessage] = useState<INewMessage | null>(null);

  const changeMessages = (
    dataMessage: { textMessage?: string },
    idMessage: string,
    timestamp: number,
    chatId: string,
  ) => {
    const { textMessage } = dataMessage;
    const message = textMessage ?? 'неизвестный формат сообщения';
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
    const { textMessage } = dataMessage;
    const message = textMessage ?? 'неизвестный формат сообщения';
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
    } = body;
    let data;
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
    if (!apiTokenInstance || !idInstance) return;
    const messages = setInterval(() => {
      check();
    }, 30000);

    return () => clearInterval(messages);
  });

  return newMessage;
};
