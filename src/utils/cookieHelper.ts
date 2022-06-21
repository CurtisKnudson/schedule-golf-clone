import Cookies from 'js-cookie';

export const setCookie = (key: string, value: string, expirationValue?: string) => {
  if (!expirationValue) {
    Cookies.remove(key);
    Cookies.set(key, value);
  }
  Cookies.set(key, value, { expiration: expirationValue });
};

export const getCookie = (key: string) => {
  return Cookies.get(key);
};
