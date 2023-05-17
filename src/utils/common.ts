const locales = 'by-BY';

export const changeFormatDate = (date: Date) => {
  const newDate = date.toLocaleDateString(locales);
  return newDate
    .split('/')
    .map(num => {
      if (+num < 10) return `0${num}`;
      return num;
    })
    .join('.');
};
