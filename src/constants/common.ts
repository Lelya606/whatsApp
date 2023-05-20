import { AuthType } from 'types/authType';

const { AUTHORIZED, NOT_AUTHORIZED, BLOCKED, SLEEP_MODE, STARTING } = AuthType;

export const STATUS_MESSAGE = {
  DEL: 'delivered',
  READ: 'read',
  PEN: 'pending',
};

export const CHAT_ID = '@c.us';

export const UNKNOWN_MESSAGE = 'неизвестный формат сообщения';

export const ERROR_MESSAGE = {
  CHECK: 'Проверьте введенный номер',
  UNUSED: 'пока не использует WhatsApp',
};

export const AUTH_STATUS = {
  [AUTHORIZED]: '',
  [NOT_AUTHORIZED]: 'Аккаунт не авторизован',
  [BLOCKED]: 'Аккаунт забанен',
  [SLEEP_MODE]:
    'Аккаунт ушел в спящий режим. Состояние возможно, когда выключен телефон. ' +
    'После включения телефона может потребоваться до 5 минут для перевода состояния аккаунта',
  [STARTING]:
    'Аккаунт в процессе запуска (сервисный режим). Происходит перезагрузка инстанса, ' +
    'сервера или инстанс в режиме обслуживания. Может потребоваться до 5 минут для перевода состояния аккаунта',
};

export const AUTH = {
  ID_INSTANCE: 'idInstance',
  API_TOKEN_INSTANCE: 'apiTokenInstance',
};

export const ROUTS = {
  MESSAGE: '/',
  LOGIN: '/login',
};
