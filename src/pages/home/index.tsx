// Node Modules
import { toast } from 'react-toastify';
// Providers
import { useSession } from 'providers/sessionProvider';

export const Home = () => {
  const [, setSessionEverywhere] = useSession();

  const handleSignout = () => {
    setSessionEverywhere(undefined, undefined, true);
    toast("You've been signed out");
  };

  return (
    <div className="flex justify-center flex-col">
      <div
        role="button"
        className="mx-4 cursor-pointer mt-8"
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
