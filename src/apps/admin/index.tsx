// Node Modules
import { Route, Routes } from 'react-router-dom';
// Components
import { NavigationPath } from 'apps/admin/components/navigationPath';
import { Sidebar } from 'apps/admin/components/sidebar';
// Layout
import { RequireAuth } from 'apps/admin/layout/requireAuth';
import { adminRoutes } from 'apps/admin/routes';
// Providers
import AuthMediatorProvider from 'apps/admin/providers/authMediatorProvider';
import SessionProvider from 'apps/admin/providers/sessionProvider';

export const Clubhouse = () => {
  return (
    <SessionProvider>
      <AuthMediatorProvider>
        <RequireAuth>
          <>
            <div className="flex max-h-screen overflow-hidden">
              <Sidebar />
              <div className="w-full my-2 ml-8 mr-8">
                <NavigationPath />
                <Routes>
                  {adminRoutes.map((mappedRoute) => {
                    const { id, name, path, element, isIndex } = mappedRoute;
                    return (
                      <Route
                        key={`${id}${name}`}
                        path={path}
                        index={isIndex}
                        element={element}
                      />
                    );
                  })}
                </Routes>
              </div>
            </div>
          </>
        </RequireAuth>
      </AuthMediatorProvider>
    </SessionProvider>
  );
};
