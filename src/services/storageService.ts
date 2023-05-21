export const getLocalStorage = (key: string) =>
  window.localStorage.getItem(key);

export const setLocalStorage = (key: string, value: any) =>
  window.localStorage.setItem(key, value);

export const deleteLocalStorage = (key: string) =>
  window.localStorage.removeItem(key);
