// Node Modules
// Adapter
import { AuthGrpcAdapter } from 'adapters/authGrpcAdapter';
// Hooks
import makeContextHook from 'hooks/makeContextHooks';
// Mediator
import { AuthMediator } from 'mediators/authMediator';
// Types
import { AuthMediatorInterface } from 'mediators/types/authMediatorInterface';
import React, { createContext, useEffect, useState } from 'react';

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
