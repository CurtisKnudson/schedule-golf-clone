// Node Modules
// Providers
import { Login } from 'pages/authentication/login';
import { useSession } from 'providers/sessionProvider';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const [session] = useSession();

  if (!session.user || !session.isValidToken) {
    return <Login />;
  }
  return children;
};
