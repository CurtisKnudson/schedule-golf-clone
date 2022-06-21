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
// Providers
import { useAuthMediator } from 'providers/authMediatorProvider';

export const SessionContext = createContext<
  [Session, (sessionParam?: Session) => void] | undefined
>(undefined);

export const useSession = makeContextHook(SessionContext);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const authMediator = useAuthMediator();
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
    window.location.reload();
  };

  if (!session.user) {
    const localSession: Session | null = getLocalStorageSession();
    if (localSession) {
      setSession(localSession);
    }
  }

  const handleRefreshToken = async () => {
    const { isAuthenticated } = await authMediator.userRefreshToken();
    if (!isAuthenticated) {
      // If user no longer has valid JWT, sign user out
      setSessionEverywhere();
    }
  };
  // console.log({
  //   expiration: session.expiration,
  //   parsed: Date(session.expiration),
  //   unix: new Date(session.expiration).getTime(),
  // });
  return (
    <SessionContext.Provider value={[session, setSessionEverywhere]}>
      <div
        className="text-green-400 fixed top-0 right-0 m-8 cursor-pointer"
        onClick={handleRefreshToken}
        onKeyDown={(e) => {
          if (e.code != 'Enter') {
            return;
          }
          handleRefreshToken();
        }}
        role="button"
        aria-label="Handle refresh"
        tabIndex={0}
      >
        Refresh Auth Token
      </div>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
