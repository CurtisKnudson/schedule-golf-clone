// Node Modules
// Hooks
import makeContextHook from 'hooks/makeContextHooks';
import React, { createContext, useState } from 'react';
// Types
import { Session } from 'types/session';
// Utils
import { getLocalStorageSession } from 'utils/handleLocalStorage';

export const SessionContext = createContext<
  [Session, React.Dispatch<React.SetStateAction<Session>>] | undefined
>(undefined);

export const useSession = makeContextHook(SessionContext);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session>({
    user: null,
    expiration: null,
    isValidToken: false,
  });

  if (!session.user) {
    const localSession: Session | null = getLocalStorageSession();
    if (localSession) {
      setSession(localSession);
    }
  }

  return (
    <SessionContext.Provider value={[session, setSession]}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
