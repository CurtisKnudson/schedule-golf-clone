// Node modules
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import { HomeIcon, ArrowRightIcon } from 'icons';

export const NavigationPath = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div>
      <div className="flex mt-8 h-4">
        {breadcrumbs.map((obj, index) => {
          if (obj.key === '/') {
            return (
              <div key={index} className="flex center-all">
                <Link to={obj.key}>
                  <div className="text-gray-500">
                    <HomeIcon className="h-5 w-5 mr-2" />
                  </div>
                </Link>
                {obj.key === obj.location.pathname ? (
                  <div className="text-gray-500 ml-2 flex center-all text-sm">
                    <ArrowRightIcon className="h-3 w-3 mr-4" />
                    <Link to={obj.key}>
                      <div
                        className={`cursor-pointer p-1 rounded  ${
                          obj.key === obj.location.pathname
                            ? 'bg-green-150 bg-green text-green-600 font-semibold'
                            : null
                        }`}
                      >
                        {obj.breadcrumb}
                      </div>
                    </Link>
                  </div>
                ) : null}
              </div>
            );
          }
          return (
            <div key={index} className="text-gray-500 ml-2 flex center-all text-sm">
              <ArrowRightIcon className="h-3 w-3 mr-4" />
              <Link to={obj.key}>
                <div
                  className={`cursor-pointer p-1 rounded  ${
                    obj.key === obj.location.pathname
                      ? 'bg-green-150 bg-green text-green-600 font-semibold'
                      : null
                  }`}
                >
                  {obj.breadcrumb}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
