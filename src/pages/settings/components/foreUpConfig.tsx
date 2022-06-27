// Node Modules
import { useAuthMediator } from 'providers/authMediatorProvider';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
// Utils
import { getCookie } from 'utils/cookieHelper';

export const ForeUpConfig = () => {
  const authMediator = useAuthMediator();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  // Need to check and see if the configuration already exists

  // If not need to render html to configure

  // If they have configured, maybe create options to reconfigure, or reset
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleConnect = async () => {
    if (!inputs.email && !inputs.password) {
      toast.error('Please provide an email and password');
      throw new Error('You must provide an email and password to connect');
    }
    if (!inputs.email) {
      toast.error('You must provide an email to connect');
      throw new Error('You must provide an email to connect');
    }
    if (!inputs.password) {
      toast.error('You must provide a password to connect');
      throw new Error('You must provide a password to connect');
    }
    const scheduleGolfJwt = getCookie('token');

    if (scheduleGolfJwt) {
      const authRequest = {
        ...inputs,
        scheduleGolfJwt,
      };
      authMediator.foreUpAuthentication(authRequest);
    }
  };
  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="flex flex-col w-full max-w-xs">
        <input
          name="email"
          placeholder="Email"
          type="email"
          className="h-12 px-2 border rounded my-1"
          aria-label="Email"
          value={inputs.email}
          onChange={handleInputChange}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          className="h-12 px-2 border rounded my-1"
          aria-label="Password"
          value={inputs.password}
          onChange={handleInputChange}
        />
        <button
          onClick={handleConnect}
          className="my-2 h-12 px-2 bg-orange-400 rounded text-white"
        >
          Connect ForeUp
        </button>
      </div>
      <div className="mb-8 center-all mt-4 max-w-md p-2 bg-white rounded md:ml-24">
        <span className="w-8/12">
          You must connect ForeUp before T-Times will be displayed at your clubhouse
        </span>
      </div>
    </div>
  );
};
