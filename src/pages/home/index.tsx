// Node Modules
// Providers
import { useSession } from 'providers/sessionProvider';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Home = () => {
  const navigate = useNavigate();
  const [session, setSession] = useSession();

  const handleSignout = () => {
    setSession({
      user: null,
      expiration: null,
      isValidToken: false,
    });
    window.localStorage.removeItem('session');
    navigate('/');
    toast("You've been signed out");
  };

  return (
    <div className="flex justify-center flex-col">
      <nav className="flex m-4">
        <Link className="mx-4" to="/">
          Home
        </Link>
        <Link className="mx-4" to="/signup">
          Signup
        </Link>
        <Link className="mx-4" to="/login">
          Login
        </Link>
        <Link className="mx-4" to="/protected">
          Protected Route
        </Link>
        {session.user ? (
          <div className="mx-4 cursor-pointer" onClick={handleSignout}>
            SignOut
          </div>
        ) : null}
      </nav>

      <div className="mx-8">Generic Marketing Page</div>
    </div>
  );
};
