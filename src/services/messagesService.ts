import apiService from './apiService';

export const messagesApi = {
  chekPhone: (
    phoneNumber: string,
    idInstance: string,
    apiTokenInstance: string,
  ) =>
    apiService.post(
      `waInstance${idInstance}/CheckWhatsapp/${apiTokenInstance}`,
      {
        phoneNumber,
      },
    ),
};

export const chekPhoneNumber = async (
  phone: string,
  idInstance: string,
  apiTokenInstance: string,
) => {
  try {
    const { data } = await messagesApi.chekPhone(
      phone,
      idInstance,
      apiTokenInstance,
    );
    return data;
  } catch (err) {
    return err;
  }
};
