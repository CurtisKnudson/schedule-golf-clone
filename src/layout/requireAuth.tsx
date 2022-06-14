// Node Modules
// Providers
import { useSession } from 'providers/sessionProvider';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  const [session] = useSession();

  if (!session.user || !session.isValidToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
