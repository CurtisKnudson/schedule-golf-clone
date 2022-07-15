// Node Modules
import React, { createContext, useEffect, useState } from 'react';
// Adapter
import { AuthGrpcAdapter } from 'apps/admin/adapters/authGrpcAdapter';
// Hooks
import makeContextHook from 'hooks/makeContextHooks';
// Mediator
import { AuthMediator } from 'apps/admin/mediators/authMediator';
// Types
import { AuthMediatorInterface } from 'apps/admin/mediators/types/authMediatorInterface';

const AuthMediatorContext = createContext<AuthMediatorInterface | undefined>(undefined);

export const useAuthMediator = makeContextHook(AuthMediatorContext);

const AuthMediatorProvider = ({ children }: { children: React.ReactNode }) => {
  const api = new AuthGrpcAdapter();

  const [authMediator] = useState(() => new AuthMediator(api));

  useEffect(() => {
    return () => {
      authMediator.dispose();
    };
  }, [authMediator]);

  return (
    <AuthMediatorContext.Provider value={authMediator}>
      {children}
    </AuthMediatorContext.Provider>
  );
};

export default AuthMediatorProvider;
