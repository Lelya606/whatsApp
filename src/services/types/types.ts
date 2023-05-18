export interface IAuth {
  idInstance: string;
  apiTokenInstance: string;
}

export interface IMessage {
  message: string;
  chatId: string;
}

export interface IPostMessage extends IAuth {
  data: IMessage;
}

export interface IMessages extends IAuth {
  chatId: string;
}

export interface IPone extends IAuth {
  phoneNumber: string;
}
