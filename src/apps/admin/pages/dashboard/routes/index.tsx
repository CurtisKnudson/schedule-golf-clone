import { Routes } from 'types/routes';
import { DashboardHome } from 'apps/admin/pages/dashboard/dashboardHome';

export const dashboardRoutes: Routes[] = [
  {
    id: 1,
    name: 'dashboard-splat',
    path: '*',
    element: <div>You tried to access a route that does not exist</div>,
  },
  {
    id: 2,
    name: 'default',
    element: <DashboardHome />,
    isIndex: true,
  },
  {
    id: 3,
    name: 'Overview',
    path: 'overview',
    element: <div>I am the overview element</div>,
  },
  {
    id: 4,
    name: 'Notifications',
    path: 'notifications',
    element: <div>I am the notifications element</div>,
  },
  {
    id: 5,
    name: 'Saved Reports',
    path: 'saved-reports',
    element: <div>I am the Saved Reports element</div>,
  },
  {
    id: 6,
    name: 'Orders',
    path: 'orders',
    element: <div>I am the Orders element</div>,
  },
  {
    id: 7,
    name: 'User Reports',
    path: 'user-reports',
    element: <div>I am the User Reports element</div>,
  },
  {
    id: 8,
    name: 'Manage Notifications',
    path: 'manage-notifications',
    element: <div>I am the Manage Notifications element</div>,
  },
];
