// Node Modules
import { Route, Routes } from 'react-router-dom';
// Components
import { ComponentHeader } from 'components/componentHeader';
import { dashboardRoutes } from './routes';

export const Dashboard = () => {
  return (
    <div>
      <ComponentHeader header="Dashboard" />
      <Routes>
        {dashboardRoutes.map((route, index) => {
          const { id, name, path, element, isIndex } = route;
          return (
            <Route
              key={`${index}${id}${name}`}
              path={path}
              element={element}
              index={isIndex}
            />
          );
        })}
      </Routes>
    </div>
  );
};
