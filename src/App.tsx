// Node Modules
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// CSS
import 'react-toastify/dist/ReactToastify.css';
import { appRoutes } from 'routes';

const App = () => {
  return (
    <>
      <Routes>
        {appRoutes.map((mappedRoute) => {
          const { id, name, path, element, isIndex } = mappedRoute;
          return (
            <Route key={`${id}${name}`} path={path} index={isIndex} element={element} />
          );
        })}
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
