// Types
import { Session } from 'apps/admin/types/session';

export const setLocalStorageSession = (session: Session) => {
  localStorage.removeItem('session');
  localStorage.setItem('session', JSON.stringify(session));
};

export const getLocalStorageSession = (): Session | null => {
  const localStorageSession = localStorage.getItem('session');

  if (!localStorageSession) {
    return null;
  }

  const parsedSession = JSON.parse(localStorageSession);

  const session: Session = {
    user: parsedSession.user,
    expiration: parsedSession.expiration,
    isValidToken: parsedSession.isValidToken,
  };

  return session;
};
