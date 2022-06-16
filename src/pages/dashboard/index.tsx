// Node Modules
import { Link } from 'react-router-dom';
// Layout
import { RequireAuth } from 'layout/requireAuth';
// Providers
import { useSession } from 'providers/sessionProvider';

export const Dashboard = () => {
  const [session] = useSession();
  return (
    <RequireAuth>
      <div>
        <div>
          <Link to="/">Back to Home</Link>
        </div>
        <div> I am the dashboard and this is a protected route</div>
        <div className="mt-24">Company Name: {session.user?.companyName}</div>
        <div>
          Name: {session.user?.firstName}
          {session.user?.lastName}
        </div>
        <div>Email : {session.user?.email}</div>
      </div>
    </RequireAuth>
  );
};
