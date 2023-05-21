const locales = 'ru-RU';

interface IMessageData {
  idMessage: string;
  statusMessage?: string;
  textMessage: string;
  timestamp: number;
}
export const changeFormatDate = (date: Date) =>
  date
    .toLocaleDateString(locales)
    .split('/')
    .map(num => {
      if (+num < 10) return `0${num}`;
      return num;
    })
    .join('.');

export const changeTime = (date: Date) => {
  const time = date.toLocaleTimeString();
  const [hour, min] = time.split(':');
  return `${hour}:${min}` ?? '';
};

export const changeDataChats = (data: { id: string }[]) =>
  !!data.length &&
  data.map(({ id }) => {
    const [phone] = id.split('@');
    return { chatId: id, phone: `+${phone}` };
  });

export const changeMessages = (data: IMessageData[]) =>
  !!data.length &&
  data.map(({ idMessage, statusMessage, textMessage, timestamp }) => {
    const newDate = new Date(timestamp * 1000);
    const date = changeFormatDate(newDate);
    const time = changeTime(newDate);

    return {
      idMessage,
      statusMessage,
      textMessage,
      date,
      time,
    };
  });
