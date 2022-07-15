// Node Modules
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// Providers
import { useSession } from 'apps/admin/providers/sessionProvider';
// Components
import { ComponentHeader } from 'apps/admin/components/componentHeader';

export const Home = () => {
  const [, setSessionEverywhere] = useSession();

  const handleSignout = () => {
    setSessionEverywhere(undefined, undefined, true);
    toast("You've been signed out");
  };

  return (
    <div className="flex justify-center flex-col">
      <ComponentHeader header="Home" />
      <div
        role="button"
        className="cursor-pointer m-8 border w-32 rounded center-all hover:bg-slate-200"
        tabIndex={0}
        onClick={handleSignout}
        onKeyDown={(e) => {
          if (e.code != 'Enter') {
            return;
          }
          handleSignout();
        }}
      >
        SignOut
      </div>
      <Link
        to="/"
        className="m-8 cursor-pointer border w-40 rounded center-all hover:bg-gray-400"
      >
        Go to Client
      </Link>
    </div>
  );
};
