import Cookies from 'js-cookie';

export const setCookie = (key: string, value: string) => {
  Cookies.remove(key);
  Cookies.set(key, value);
};
