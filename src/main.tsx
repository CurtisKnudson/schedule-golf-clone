// Node Modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Css
import './index.css';
// Components
import App from 'App';
// Providers
import AuthMediatorProvider from 'apps/admin/providers/authMediatorProvider';
import SessionProvider from 'apps/admin/providers/sessionProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <App />
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
