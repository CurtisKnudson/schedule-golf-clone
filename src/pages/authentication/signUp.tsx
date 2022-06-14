// Node Modules
import Cookies from 'js-cookie';
// Provider
import { useAuthMediator } from 'providers/authMediatorProvider';
import { useSession } from 'providers/sessionProvider';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Session } from 'types/session';
// Types
import { NewUser } from 'types/user';
// Utils
import { setLocalStorageSession } from 'utils/handleLocalStorage';

export const SignUp = () => {
  const authMediator = useAuthMediator();
  const [, setSession] = useSession();

  const [newUser, setNewUser] = useState<NewUser>({
    userId: '',
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: '',
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const req = await authMediator.createNewUser(newUser);

    if (typeof req.headers.token !== 'string') {
      throw new Error('Request Headers returned an invalid token');
    }

    Cookies.set('token', req.headers.token);

    const session: Session = {
      user: req.response,
      expiration: Date.now().toLocaleString(),
      isValidToken: true,
    };

    setLocalStorageSession(session);
    setSession(session);
  };

  return (
    <div className="bg-gray-50">
      <div>
        <div>Token: {Cookies.get('token')}</div>
      </div>
      <div>
        <Link to="/">Back to home</Link>
      </div>
      <div className="flex justify-center items-center text-center min-h-screen pb-20 ">
        <div className="flex flex-col">
          <div className="border min-h-80 h-auto w-96 mt-4 rounded p-4 bg-white shadow-lg">
            <div>
              <input
                name="companyName"
                placeholder="Company Name"
                type="text"
                className="h-12 px-2 w-full border rounded my-1"
                aria-label="Company Name"
                value={newUser.companyName}
                onChange={handleLoginChange}
              />
              <input
                name="firstName"
                placeholder="First Name"
                type="text"
                className="h-12 px-2 w-full border rounded my-1"
                aria-label="First Name"
                value={newUser.firstName}
                onChange={handleLoginChange}
              />
              <input
                name="lastName"
                placeholder="Last Name"
                type="text"
                className="h-12 px-2 w-full border rounded my-1"
                aria-label="Last Name"
                value={newUser.lastName}
                onChange={handleLoginChange}
              />
              <input
                name="email"
                placeholder="Email"
                type="email"
                className="h-12 px-2 w-full border rounded my-1"
                aria-label="Email"
                value={newUser.email}
                onChange={handleLoginChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="h-12 px-2 w-full border rounded my-1"
                aria-label="Password"
                value={newUser.password}
                onChange={handleLoginChange}
              />
              <button
                onClick={handleSubmit}
                className="w-full h-12 border rounded bg-green-600 text-white my-2"
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
