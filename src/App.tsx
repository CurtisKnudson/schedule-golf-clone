// Node Modules
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// CSS
import 'react-toastify/dist/ReactToastify.css';
//Routes
import { appRoutes } from 'routes';
// Layout
import { RequireAuth } from 'layout/requireAuth';
// Components
import { Sidebar } from 'components/sidebar';
import { NavigationPath } from 'components/navigationPath';

const App = () => {
  return (
    <RequireAuth>
      <div className="h-1 bg-green-1000">
        <div className="flex">
          <Sidebar />
          <div className="w-full m-2">
            <NavigationPath />
            <Routes>
              {appRoutes.map((mappedRoute) => {
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

        <ToastContainer />
      </div>
    </RequireAuth>
  );
};

export default App;
