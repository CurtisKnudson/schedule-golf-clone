// Node
import { Outlet } from 'react-router-dom';

// Apps
import { Clubhouse } from 'apps/admin';
import { Client } from 'apps/client';

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
    element: <Client />,
  },
  {
    id: 4,
    name: 'Clubhouse',
    path: 'admin/*',
    element: <Clubhouse />,
  },
];
