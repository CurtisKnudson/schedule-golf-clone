// Node Modules
import { toast } from 'react-toastify';
// Providers
import { useSession } from 'providers/sessionProvider';
// Components
import { ComponentHeader } from 'components/componentHeader';

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
        className="cursor-pointer mt-8"
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
    </div>
  );
};
