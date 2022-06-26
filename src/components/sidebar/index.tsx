/// <reference types="vite-plugin-svgr/client" />
// Node Modules
import { Link } from 'react-router-dom';

// Icons
import { HomeIcon, SettingsIcon, DashboardIcon } from 'icons';
import { ReactComponent as GolfBallHeaderIcon } from 'public/golf-svg.svg';

export interface SidebarItemProps {
  children: JSX.Element;
  path?: string;
}
export const SidebarItem: React.FC<SidebarItemProps> = ({ children, path }) => {
  return (
    <div className="my-2">
      <Link to={path ? path : '/'}>
        <div className="p-2 rounded cursor-pointer bg-green  hover:bg-green-850">
          {children}
        </div>
      </Link>
    </div>
  );
};

const sidebarItems = [
  {
    name: 'Home',
    path: '/',
    icon: <HomeIcon className="text-white h-auto w-6" />,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon className="text-white h-auto w-6" />,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <SettingsIcon className="text-white h-auto w-6" />,
  },
];

export const Sidebar = () => {
  return (
    <div>
      <div className="bg-green-1000 h-screen rounded w-16 flex flex-col items-center">
        <div className="mx-4 my-8">
          <Link to="/">
            <GolfBallHeaderIcon />
          </Link>
        </div>
        {sidebarItems.map((item) => {
          return (
            <SidebarItem path={item.path} key={item.name}>
              {item.icon}
            </SidebarItem>
          );
        })}
      </div>
    </div>
  );
};
