// Providers
import { useSession } from 'providers/sessionProvider';
// Components
import { ComponentHeader } from 'components/componentHeader';

export const Dashboard = () => {
  const [session] = useSession();
  return (
    <div>
      <ComponentHeader header="Dashboard" />
      <div className="flex justify-center items-center text-center min-h-screen pb-20 flex-col">
        <div>User Profile Information:</div>
        <div>Company Name: {session.user?.companyName}</div>
        <div>
          Name: {session.user?.firstName}
          {session.user?.lastName}
        </div>
        <div>Email : {session.user?.email}</div>
      </div>
    </div>
  );
};
