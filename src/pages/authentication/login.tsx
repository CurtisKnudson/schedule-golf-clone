// Node Modules
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export interface LoginCreds {
  email: string;
  password: string;
}

export const Login = () => {
  const [login, setLogin] = useState<LoginCreds>({
    email: '',
    password: '',
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogin({
      ...login,
      [name]: value,
    });
  };

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
                value={login.email}
                onChange={handleLoginChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="h-12 px-2 w-full border rounded my-1"
                aria-label="Password"
                value={login.password}
                onChange={handleLoginChange}
              />
              <button className="w-full h-12 border rounded bg-green-600 text-white my-2">
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
