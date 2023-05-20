import apiService from 'services/apiService';
import { IAuth } from 'services/types/types';

export const authApi = {
  get: ({ idInstance, apiTokenInstance }: IAuth) =>
    apiService.get(
      `waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
    ),
};

export const getStatusInstance = async (data: IAuth) => {
  try {
    const response = await authApi.get(data);
    return response.data;
  } catch (err) {
    return err;
  }
};
