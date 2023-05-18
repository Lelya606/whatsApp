import apiService from 'services/apiService';
import { IPostMessage } from 'services/types/types';

export const messagesApi = {
  post: ({ data, idInstance, apiTokenInstance }: IPostMessage) =>
    apiService.post(
      `waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
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
