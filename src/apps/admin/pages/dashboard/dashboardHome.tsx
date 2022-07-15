// Providers
import { useSession } from 'apps/admin/providers/sessionProvider';
export const DashboardHome = () => {
  const [session] = useSession();
  return (
    <div className="flex justify-center items-center text-center flex-col">
      <div>User Profile Information:</div>
      <div>Company Name: {session.user?.companyName}</div>
      <div>
        Name: {session.user?.firstName}
        {session.user?.lastName}
      </div>
      <div>Email : {session.user?.email}</div>
    </div>
  );
};
