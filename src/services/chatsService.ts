import apiService from 'services/apiService';
import { IAuth, IMessages, IPone } from 'services/types/types';

export const chatsApi = {
  chek: ({ phoneNumber, idInstance, apiTokenInstance }: IPone) =>
    apiService.post(
      `waInstance${idInstance}/CheckWhatsapp/${apiTokenInstance}`,
      {
        phoneNumber,
      },
    ),
  getChants: ({ idInstance, apiTokenInstance }: IAuth) =>
    apiService.get(`waInstance${idInstance}/getChats/${apiTokenInstance}`),
  getMessages: ({ chatId, idInstance, apiTokenInstance }: IMessages) =>
    apiService.post(
      `waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
      { chatId },
    ),
};

export const chekPhoneNumber = async (data: IPone) => {
  try {
    const response = await chatsApi.chek(data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getChants = async (dataAuth: IAuth) => {
  try {
    const response = await chatsApi.getChants(dataAuth);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getMessages = async (data: IMessages) => {
  try {
    const response = await chatsApi.getMessages(data);
    return response.data;
  } catch (err) {
    return err;
  }
};
