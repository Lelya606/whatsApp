import apiService from 'services/apiService';
import { IGetMessage, IPostMessage } from 'services/types/types';

export const messagesApi = {
  post: ({ data, idInstance, apiTokenInstance }: IPostMessage) =>
    apiService.post(
      `waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      data,
    ),
  getMessage: (
    data: IGetMessage,
    idInstance: string,
    apiTokenInstance: string,
  ) =>
    apiService.post(
      `waInstance${idInstance}/getMessage/${apiTokenInstance}`,
      data,
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
