// Node Modules
import { useLocation } from 'react-router-dom';
// Providers
import { useSession } from 'apps/admin/providers/sessionProvider';
// Pages
import { SignUp } from 'apps/admin/pages/authentication/signUp';
import { Login } from 'apps/admin/pages/authentication/login';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const [session] = useSession();
  const location = useLocation();

  if (!session.user || !session.isValidToken) {
    if (location.pathname === '/signup') {
      return <SignUp />;
    }
    if (window.location.pathname !== '/') {
      window.location.pathname = '/';
    }
    return <Login />;
  }
  return children;
};
