// Icons
import {
  HomeIcon,
  DashboardIcon,
  AnalyticsIcon,
  PresentationChartLineIcon,
  BellIcon,
  StarIcon,
  ShoppingCartIcon,
  UserIcon,
  SettingsIcon,
} from 'icons';

export interface SidebarItem {
  name: string;
  path: string;
  icon: JSX.Element;
  nestedItems?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
  {
    name: 'Home',
    path: '/admin',
    icon: <HomeIcon className="h-auto w-6" />,
  },
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: <DashboardIcon className="h-auto w-6" />,
    nestedItems: [
      // nested routes are relative to the parent path.. /admin/dashboard/overview
      {
        name: 'Overview',
        path: '/overview',
        icon: <PresentationChartLineIcon className="text-gray-200 h-auto w-6" />,
      },
      {
        name: 'Notifications',
        path: '/notifications',
        icon: <BellIcon className="h-auto w-6" />,
      },
      {
        name: 'Saved Reports',
        path: '/saved-reports',
        icon: <StarIcon className="h-auto w-6" />,
      },
      {
        name: 'Orders',
        path: '/orders',
        icon: <ShoppingCartIcon className="h-auto w-6" />,
      },
      {
        name: 'User Reports',
        path: '/user-reports',
        icon: <UserIcon className="h-auto w-6" />,
      },
      {
        name: 'Manage Notifications',
        path: '/manage-notifications',
        icon: <SettingsIcon className="h-auto w-6" />,
      },
    ],
  },
  {
    name: 'Analytics',
    path: 'analytics',
    icon: <AnalyticsIcon className="h-auto w-6" />,
  },
];
