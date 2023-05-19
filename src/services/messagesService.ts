import apiService from 'services/apiService';
import { IAuth, IDeleteMessage, IPostMessage } from 'services/types/types';

export const messagesApi = {
  post: ({ data, idInstance, apiTokenInstance }: IPostMessage) =>
    apiService.post(
      `waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      data,
    ),
  check: ({ idInstance, apiTokenInstance }: IAuth) =>
    apiService.get(
      `waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`,
    ),
  delete: ({ receiptId, idInstance, apiTokenInstance }: IDeleteMessage) =>
    apiService.delete(
      `waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`,
    ),
};

export const sendMessage = async (data: IPostMessage) => {
  try {
    const response = await messagesApi.post(data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const checkMessages = async (data: IAuth) => {
  try {
    const response = await messagesApi.check(data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const deleteMessage = async (data: IDeleteMessage) => {
  try {
    const response = await messagesApi.delete(data);
    console.log(response);
    return response.data;
  } catch (err) {
    return err;
  }
};
