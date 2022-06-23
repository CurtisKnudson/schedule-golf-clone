// Node Modules
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// Types
import { LoginCredentials } from 'pages/authentication/types/loginCredentials';
import { Session } from 'types/session';
// Providers
import { useSession } from 'providers/sessionProvider';
// Mediators
import { useAuthMediator } from 'providers/authMediatorProvider';

export const Login = () => {
  const authMediator = useAuthMediator();
  const [session, setSessionEverywhere] = useSession();
  const [userLoginInputs, setUserLoginInputs] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLoginInputs({
      ...userLoginInputs,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    const { email, password } = userLoginInputs;
    if (!email) {
      const warning = 'You must provide a valid email address to login';
      toast.error(warning);
      throw new Error(warning);
    }
    if (!password) {
      const warning = 'You must provide a valid password to login';
      toast.error(warning);
      throw new Error(warning);
    }
    const req = await authMediator.userLogin(userLoginInputs).catch(() => {
      toast.error('Invalid Credentials');
      throw new Error('Invalid Credentials');
    });

    const { res, expiration } = req;

    const session: Session = {
      user: res,
      expiration,
      isValidToken: true,
    };

    setSessionEverywhere(session, 'dashboard');
  };

  if (session.user && session.isValidToken) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="bg-gray-50">
      <div>
        <Link to="/">Back to home</Link>
      </div>
      <div className="flex justify-center items-center text-center min-h-screen pb-20 ">
        <div className="flex flex-col">
          <div className="border min-h-80 h-auto w-96 mt-4 rounded p-4 bg-white shadow-lg">
            <div>
              <input
                name="email"
                placeholder="Email"
                type="email"
                className="h-12 px-2 w-full border rounded my-1"
                aria-label="Email"
                value={userLoginInputs.email}
                onChange={handleLoginChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="h-12 px-2 w-full border rounded my-1"
                aria-label="Password"
                value={userLoginInputs.password}
                onChange={handleLoginChange}
              />
              <button
                className="w-full h-12 border rounded bg-green-600 text-white my-2"
                onClick={handleLogin}
              >
                Log In
              </button>
              <div className="my-2 text-sm text-green-600">Forgot Password?</div>
              <hr className="mt-4" />
              <div>
                <button className="my-2 h-12 px-2 bg-orange-400 rounded text-white">
                  <Link to="/signup">Create new account</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
