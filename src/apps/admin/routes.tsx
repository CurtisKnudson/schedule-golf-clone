import { Routes } from 'types/routes';

import { Login } from 'apps/admin/pages/authentication/login';
import { SignUp } from 'apps/admin/pages/authentication/signUp';
import { Dashboard } from 'apps/admin/pages/dashboard';
import { Analytics } from 'apps/admin/pages/analytics';
import { Settings } from 'apps/admin/pages/settings';
import { Home } from 'apps/admin/pages/home';

// All Routes relative to /clubouse/*
export const adminRoutes: Routes[] = [
  {
    id: 1,
    name: 'admin splat route',
    path: '*',
    element: <div>You have found a route that doesnt exist in the clubouse path</div>,
  },
  {
    id: 2,
    name: 'Home',
    isIndex: true,
    element: <Home />,
  },
  {
    id: 3,
    name: 'Login',
    path: 'login',
    element: <Login />,
  },
  {
    id: 4,
    name: 'SignUp',
    path: 'signup',
    element: <SignUp />,
  },
  {
    id: 5,
    name: 'Dashboard',
    path: 'dashboard/*',
    element: <Dashboard />,
  },
  {
    id: 6,
    name: 'Analytics',
    path: 'analytics/*',
    element: <Analytics />,
  },
  {
    id: 7,
    name: 'Settings',
    path: 'settings/*',
    element: <Settings />,
  },
];
