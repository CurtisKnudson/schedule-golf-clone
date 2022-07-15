// Node Modules
import Cookies from 'js-cookie';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Hooks
import makeContextHook from 'hooks/makeContextHooks';
// Types
import { Session } from 'apps/admin/types/session';
// Utils
import {
  getLocalStorageSession,
  setLocalStorageSession,
} from 'apps/admin/utils/handleLocalStorageSession';
// Providers
import { useAuthMediator } from 'apps/admin/providers/authMediatorProvider';

export const SessionContext = createContext<
  [Session, (sessionParam?: Session, path?: string, reload?: boolean) => void] | undefined
>(undefined);

export const useSession = makeContextHook(SessionContext);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const localSession: Session | null = getLocalStorageSession();
  const navigate = useNavigate();
  const authMediator = useAuthMediator();
  const [session, setSession] = useState<Session>(
    localSession
      ? localSession
      : {
          user: null,
          expiration: null,
          isValidToken: false,
        },
  );

  /**
   * Sets or deletes session based on sessionParam being passed into function or not
   * @param sessionParam match the Session type.
   * @example setSessionEverywhere()
   * @example setSessionEverywhere(session)
   */
  const setSessionEverywhere = (
    sessionParam?: Session,
    path?: string,
    reload?: boolean,
  ) => {
    if (!sessionParam) {
      setSession({
        user: null,
        expiration: null,
        isValidToken: false,
      });
      Cookies.remove('token');
      localStorage.removeItem('session');
      window.location.reload();
      navigate('/admin/login');
      return;
    }
    setLocalStorageSession(sessionParam);

    if (!reload) {
      setSession(sessionParam);
    }

    if (path) {
      navigate(`/admin/${path}`);
    }

    if (reload) {
      window.location.reload();
    }
  };

  const handleRefreshToken = async () => {
    const { isAuthenticated, expiration } = await authMediator.userTokenRefresh();

    if (!isAuthenticated) {
      // If user no longer has valid JWT, sign user out
      setSessionEverywhere();
      return;
    }
    if (!expiration) {
      return;
    }
    setSessionEverywhere({
      ...session,
      expiration,
    });
  };

  useEffect(() => {
    const expirationTime = localSession?.expiration
      ? new Date(localSession.expiration)
      : null;

    if (!expirationTime) {
      return;
    }
    const millisecondUntilExpiration = expirationTime?.getTime() - new Date().getTime();

    const tenMinutes = 600000;

    if (millisecondUntilExpiration < tenMinutes) {
      handleRefreshToken();
      return;
    }

    const id = setTimeout(handleRefreshToken, millisecondUntilExpiration);

    return () => {
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSession?.expiration]);

  return (
    <SessionContext.Provider value={[session, setSessionEverywhere]}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
