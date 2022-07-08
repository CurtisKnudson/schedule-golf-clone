// Node
import { Outlet } from 'react-router-dom';
// Pages
import { Login } from 'pages/authentication/login';
import { SignUp } from 'pages/authentication/signUp';
import { Home } from 'pages/home';
import { Dashboard } from 'pages/dashboard';
import { Settings } from 'pages/settings';
import { Analytics } from 'pages/analytics';

// Types
import { Routes } from 'types/routes';

export const appRoutes: Routes[] = [
  {
    id: 1,
    name: 'splat route',
    path: '*',
    // TODO: Need to create an actual splat page
    element: <div>Err! You tried to access a route that does not exist</div>,
  },
  {
    id: 2,
    name: 'default',
    path: '/',
    element: <Outlet />,
  },
  {
    id: 3,
    name: 'home',
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
