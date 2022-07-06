/// <reference types="vite-plugin-svgr/client" />
// Node Modules
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Icons
import { HomeIcon, SettingsIcon, DashboardIcon } from 'icons';
import { ReactComponent as GolfBallHeaderIcon } from 'public/golf-svg.svg';
import { SidebarItem } from 'components/sidebar/sidebarItem';

const sidebarItems = [
  {
    name: 'Home',
    path: '/',
    icon: <HomeIcon className="text-gray-200 h-auto w-6" />,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon className=" text-gray-200 h-auto w-6" />,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <SettingsIcon className="text-gray-200 h-auto w-6" />,
  },
];

export const Sidebar = () => {
  const t = useLocation();
  const [selected, setSelected] = useState(t.pathname);
  // TODO: Need to check for nested routes properly

  useEffect(() => {
    setSelected(t.pathname);
  }, [t.pathname]);

  return (
    <div>
      <div className="bg-green-1000 h-screen min-h-screen rounded w-16 flex flex-col items-center">
        <div className="mx-4 my-8">
          <Link to="/">
            <GolfBallHeaderIcon />
          </Link>
        </div>
        {sidebarItems.map((item) => {
          return (
            <SidebarItem path={item.path} key={item.name} selected={selected}>
              {item.icon}
            </SidebarItem>
          );
        })}
      </div>
    </div>
  );
};
