// Node Modules
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Providers
import { useSession } from 'providers/sessionProvider';

export const Home = () => {
  const [session, setSessionEverywhere] = useSession();

  const handleSignout = () => {
    setSessionEverywhere();
    toast("You've been signed out");
  };

  return (
    <div className="flex justify-center flex-col">
      <nav className="flex m-4">
        <Link className="mx-4" to="/">
          Home
        </Link>

        <Link className="mx-4" to="/dashboard">
          Dashboard
        </Link>
        {session.user ? (
          <div
            role="button"
            className="mx-4 cursor-pointer"
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
        ) : (
          <div>
            <Link className="mx-4" to="/signup">
              Signup
            </Link>
            <Link className="mx-4" to="/login">
              Login
            </Link>
          </div>
        )}
      </nav>

      <div className="mx-8">Generic Marketing Page</div>
    </div>
  );
};
