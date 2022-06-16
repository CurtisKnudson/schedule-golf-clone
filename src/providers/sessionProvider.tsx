// Node Modules
import Cookies from 'js-cookie';
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Hooks
import makeContextHook from 'hooks/makeContextHooks';
// Types
import { Session } from 'types/session';
// Utils
import { getLocalStorageSession, setLocalStorageSession } from 'utils/handleLocalStorage';

export const SessionContext = createContext<
  [Session, (sessionParam?: Session) => void] | undefined
>(undefined);

export const useSession = makeContextHook(SessionContext);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session>({
    user: null,
    expiration: null,
    isValidToken: false,
  });

  /**
   * Sets or deletes session based on sessionParam being passed into function or not
   * @param sessionParam match the Session type.
   * @example setSessionEverywhere()
   * @example setSessionEverywhere(session)
   */
  const setSessionEverywhere = (sessionParam?: Session) => {
    if (!sessionParam) {
      setSession({
        user: null,
        expiration: null,
        isValidToken: false,
      });
      Cookies.remove('token');
      localStorage.removeItem('session');
      navigate('/');
      return;
    }
    setSession(sessionParam);
    setLocalStorageSession(sessionParam);
    navigate('/dashboard');
  };

  if (!session.user) {
    const localSession: Session | null = getLocalStorageSession();
    if (localSession) {
      setSession(localSession);
    }
  }

  return (
    <SessionContext.Provider value={[session, setSessionEverywhere]}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
