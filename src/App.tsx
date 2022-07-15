// Node Modules
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// CSS
import 'react-toastify/dist/ReactToastify.css';
import { clientRoutes } from 'routes';

const App = () => {
  return (
    <>
      <Routes>
        {clientRoutes.map((mappedRoute) => {
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
