// Node
import { RequireAuth } from 'layout/requireAuth';
import { Login } from 'pages/authentication/login';
import { SignUp } from 'pages/authentication/signUp';
// Components
import { Home } from 'pages/home';
import { Outlet } from 'react-router-dom';
// Types
import { Routes } from 'types/routes';

export const appRoutes: Routes[] = [
  {
    id: 1,
    name: 'splat route',
    path: '*',
    element: <div>splat route</div>,
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
    element: <Home />,
    isIndex: true,
  },
  {
    id: 3,
    name: 'Login',
    path: '/login',
    element: <Login />,
  },
  {
    id: 4,
    name: 'SignUp',
    path: '/signup',
    element: <SignUp />,
  },
  {
    id: 5,
    name: 'protected',
    path: '/protected',
    element: (
      <RequireAuth>
        <div>This is a protected route</div>
      </RequireAuth>
    ),
  },
];
