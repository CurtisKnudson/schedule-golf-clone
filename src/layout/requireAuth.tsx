// Node Modules
import { useLocation } from 'react-router-dom';
// Providers
import { useSession } from 'providers/sessionProvider';
// Pages
import { SignUp } from 'pages/authentication/signUp';
import { Login } from 'pages/authentication/login';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const [session] = useSession();
  const location = useLocation();

  if (!session.user || !session.isValidToken) {
    if (location.pathname === '/signup') {
      return <SignUp />;
    }
    return <Login />;
  }
  return children;
};
