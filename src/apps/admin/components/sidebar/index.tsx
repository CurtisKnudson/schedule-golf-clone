/// <reference types="vite-plugin-svgr/client" />
// Node Modules
import { Link } from 'react-router-dom';

// Icons
import { SettingsIcon } from 'icons';
import { ReactComponent as GolfBallHeaderIcon } from 'public/golf-svg.svg';

// Constants
import { sidebarItems } from 'apps/admin/components/sidebar/constant/sidebarItems';

// Components
import { SidebarAccordion } from 'apps/admin/components/sidebar/sidebarAccordion';
import { SidebarItem } from 'apps/admin/components/sidebar/sidebarItem';
// Provider
import SidebarStateProvider from 'apps/admin/components/sidebar/sidebarProvider';

export const Sidebar = () => {
  return (
    <SidebarStateProvider>
      <div className="flex">
        <div className="bg-green-1000 w-16 flex flex-col items-center sidebarDimensions min-h-screen h-screen">
          <div className="mx-4 my-8">
            {/* TODO//Eventually we want the golfball logo to link to their clubhouse booking page */}
            <Link to="/admin">
              <GolfBallHeaderIcon />
            </Link>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col center-all">
              {sidebarItems.map((item) => {
                if (item.path === '/settings') {
                  return;
                }
                return (
                  <SidebarItem
                    path={item.path}
                    key={item.name}
                    nestedItems={item.nestedItems ? true : false}
                    icon={item.icon}
                  />
                );
              })}
            </div>

            <div className="flex-col center-all mb-8">
              <SidebarItem
                path="/admin/settings"
                nestedItems={false}
                icon={<SettingsIcon className="text-gray-200 h-auto w-6" />}
              />
              <hr className="my-4 opacity-30 w-full text-gray-500" />
              <img
                className="rounded-full h-10 w-10 mt-2"
                src="https://picsum.photos/200"
                alt=""
              />
            </div>
          </div>
        </div>
        <SidebarAccordion />
      </div>
    </SidebarStateProvider>
  );
};
